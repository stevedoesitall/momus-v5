import { users, tweets } from "@prisma/client";
import { Tweet, Tweets } from "./tweets";
interface Locals {
    dataArr?: users[] | tweets[] | Tweet[]
    dataObj?: users | tweets | Tweets | null
}

declare global {
  namespace Express {
    interface Response {
      locals: Locals;
      typedLocals: Locals;
    }
  }
}