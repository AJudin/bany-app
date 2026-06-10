import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { SignJWT } from "jose";
import { createRouter, publicQuery, adminProcedure } from "../middleware";
import { getDb } from "../queries/connection";
import { contacts } from "../../db/schema";
import { env } from "../lib/env";

const secret = new TextEncoder().encode(env.appSecret);

interface EmailLogEntry {
  toEmail: string;
  sentAt: string;
}

async function createAdminToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}

function parseEmailLog(raw: string | null): EmailLogEntry[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const adminRouter = createRouter({
  login: publicQuery
    .input(
      z.object({
        login: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.login !== env.adminLogin || input.password !== env.adminPassword) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid credentials" });
      }
      const token = await createAdminToken();
      return { token };
    }),

  getRequests: adminProcedure.query(async () => {
    const db = getDb();
    const rows = await db.select().from(contacts).orderBy(sql`${contacts.createdAt} DESC`);
    return rows;
  }),

  getRequestById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const row = await db.select().from(contacts).where(eq(contacts.id, input.id)).limit(1);
      if (!row.length) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Request not found" });
      }
      return row[0];
    }),

  updateRequest: adminProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "processing", "rejected", "done"]),
        adminComment: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(contacts)
        .set({
          status: input.status,
          adminComment: input.adminComment ?? null,
        })
        .where(eq(contacts.id, input.id));
      return { success: true };
    }),

  sendRequestEmail: adminProcedure
    .input(
      z.object({
        id: z.number(),
        toEmail: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const row = await db.select().from(contacts).where(eq(contacts.id, input.id)).limit(1);
      if (!row.length) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Request not found" });
      }
      const req = row[0];

      if (!env.smtpHost || !env.smtpUser || !env.smtpPass) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "SMTP не настроен в .env",
        });
      }

      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: env.smtpHost,
        port: env.smtpPort,
        secure: env.smtpPort === 465,
        auth: {
          user: env.smtpUser,
          pass: env.smtpPass,
        },
      });

      const statusMap: Record<string, string> = {
        new: "Не обработано",
        processing: "В обработке",
        rejected: "Отказ",
        done: "Обработано",
      };

      const html = `
        <h2>Заявка #${req.id}</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
          <tr><td><b>ID</b></td><td>${req.id}</td></tr>
          <tr><td><b>Дата получения</b></td><td>${new Date(req.createdAt).toLocaleString("ru-RU")}</td></tr>
          <tr><td><b>Имя</b></td><td>${req.name}</td></tr>
          <tr><td><b>Телефон</b></td><td>${req.phone}</td></tr>
          <tr><td><b>Email</b></td><td>${req.email}</td></tr>
          <tr><td><b>Описание</b></td><td>${req.comment ?? "—"}</td></tr>
          <tr><td><b>Статус</b></td><td>${statusMap[req.status] ?? req.status}</td></tr>
          <tr><td><b>Комментарий администратора</b></td><td>${req.adminComment ?? "—"}</td></tr>
        </table>
      `;

      await transporter.sendMail({
        from: env.smtpFrom || env.smtpUser,
        to: input.toEmail,
        subject: `Заявка #${req.id} — ${req.name}`,
        html,
      });

      // Записываем лог отправки
      const existingLog = parseEmailLog(req.emailLog ?? null);
      existingLog.push({
        toEmail: input.toEmail,
        sentAt: new Date().toISOString(),
      });
      await db
        .update(contacts)
        .set({ emailLog: JSON.stringify(existingLog) })
        .where(eq(contacts.id, input.id));

      return { success: true };
    }),
});
