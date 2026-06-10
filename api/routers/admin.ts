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

function buildEmailTemplate(req: {
  id: number;
  name: string;
  phone: string;
  email: string;
  comment: string | null;
  status: string;
  adminComment: string | null;
  createdAt: Date;
}) {
  const statusMap: Record<string, string> = {
    new: "Не обработано",
    processing: "В обработке",
    rejected: "Отказ",
    done: "Обработано",
  };

  const statusColor: Record<string, string> = {
    new: "#C44F3F",
    processing: "#C4703F",
    rejected: "#6B6B6B",
    done: "#4A7C59",
  };

  const dateStr = new Date(req.createdAt).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Заявка #${req.id}</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F5F0;font-family:'Inter',Arial,sans-serif;color:#2C2C2C;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:#2C2C2C;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:500;color:#FFFFFF;letter-spacing:0.02em;">ЭкоБаня</h1>
              <p style="margin:8px 0 0;font-size:12px;color:#FFFFFF;opacity:0.7;text-transform:uppercase;letter-spacing:0.15em;">Новая заявка с сайта</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 24px;font-family:'Playfair Display',Georgia,serif;font-size:22px;color:#2C2C2C;">Заявка #${req.id}</h2>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:16px;background:#F5F5F0;border-radius:8px;">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6B6B6B;">Дата получения</p>
                    <p style="margin:0;font-size:16px;font-weight:500;color:#2C2C2C;">${dateStr}</p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #E0E0D8;">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6B6B6B;">Имя</p>
                    <p style="margin:0;font-size:16px;font-weight:500;">${req.name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #E0E0D8;">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6B6B6B;">Телефон</p>
                    <p style="margin:0;font-size:16px;font-weight:500;">${req.phone}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #E0E0D8;">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6B6B6B;">Email</p>
                    <p style="margin:0;font-size:16px;font-weight:500;">${req.email}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #E0E0D8;">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6B6B6B;">Описание</p>
                    <p style="margin:0;font-size:15px;line-height:1.6;color:#2C2C2C;">${req.comment ? req.comment.replace(/\n/g, "<br>") : "—"}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #E0E0D8;">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6B6B6B;">Статус</p>
                    <span style="display:inline-block;padding:6px 14px;border-radius:20px;font-size:13px;font-weight:600;color:#FFFFFF;background:${statusColor[req.status] ?? "#6B6B6B"};">${statusMap[req.status] ?? req.status}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6B6B6B;">Комментарий администратора</p>
                    <p style="margin:0;font-size:15px;line-height:1.6;color:#2C2C2C;">${req.adminComment ? req.adminComment.replace(/\n/g, "<br>") : "—"}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#2C2C2C;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#FFFFFF;opacity:0.6;">ЭкоБаня — Модульные бани премиум-класса</p>
              <p style="margin:4px 0 0;font-size:11px;color:#FFFFFF;opacity:0.4;">Письмо отправлено из административной панели</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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

      if (!env.smtpHost) {
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
        auth: env.smtpUser && env.smtpPass ? {
          user: env.smtpUser,
          pass: env.smtpPass,
        } : undefined,
      });

      const html = buildEmailTemplate(req);

      await transporter.sendMail({
        from: `"ЭкоБаня — Админка" <${env.smtpFrom || env.smtpUser || "noreply@bany-admin.ru"}>`,
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
