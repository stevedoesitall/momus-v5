import { users, tweets } from "@prisma/client";
import { TweetReturn } from "./tweets.model";
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