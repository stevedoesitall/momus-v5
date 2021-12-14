import { users, tweets } from "@prisma/client";

interface Locals {
    dataArr?: users[] | tweets[]
    dataObj?: users | tweets | null
}

declare global {
  namespace Express {
    interface Response {
      locals: Locals;
      typedLocals: Locals;
    }
  }
}