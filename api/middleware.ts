import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { jwtVerify } from "jose";
import type { TrpcContext } from "./context";
import { env } from "./lib/env";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const createRouter = t.router;
export const publicQuery = t.procedure;

export const adminProcedure = t.procedure.use(async ({ ctx, next }) => {
  const authHeader = ctx.req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }
  const token = authHeader.slice(7);
  try {
    const secret = new TextEncoder().encode(env.appSecret);
    await jwtVerify(token, secret, { clockTolerance: 60 });
  } catch {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });
  }
  return next();
});
