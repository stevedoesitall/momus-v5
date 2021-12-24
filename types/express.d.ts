import { users, tweets } from "@prisma/client";
import { TweetReturn } from "./tweets";
interface Locals {
    dataArr?: users[] | tweets[]
    dataObj?: users | tweets | TweetReturn | null
}

declare global {
  namespace Express {
    interface Response {
      locals: Locals;
      typedLocals: Locals;
    }
  }
}