import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { contacts } from "../../db/schema";

export const contactRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "Имя обязательно"),
        phone: z.string().min(10, "Введите корректный номер телефона"),
        email: z.string().email("Введите корректный email"),
        comment: z.string().optional(),
      })
    )
    .mutation(async ({ input }: { input: { name: string; phone: string; email: string; comment?: string } }) => {
      const db = getDb();
      await db.insert(contacts).values({
        name: input.name,
        phone: input.phone,
        email: input.email,
        comment: input.comment || null,
      });
      return { success: true };
    }),
});
