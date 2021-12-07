import { users } from "@prisma/client";

interface Locals {
    users?: users[]
    user?: users | null
}

declare global {
  namespace Express {
    interface Response {
      locals: Locals;
      typedLocals: Locals;
    }
  }
}