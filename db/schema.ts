import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

export const contacts = mysqlTable("contacts", {
  id: int("id", { unsigned: true }).autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  comment: text("comment"),
  status: varchar("status", { length: 50 }).notNull().default("new"),
  adminComment: text("admin_comment"),
  emailLog: text("email_log"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
