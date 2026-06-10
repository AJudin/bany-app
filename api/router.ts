import { createRouter, publicQuery } from "./middleware";
import { contactRouter } from "./routers/contact";
import { adminRouter } from "./routers/admin";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  contact: contactRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
