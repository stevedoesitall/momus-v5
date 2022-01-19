import { users, tweets } from "@prisma/client";
import { Tweets, TweetDates } from "./tweets";

interface Locals {
  dataArr?: users[] | tweets[] | TweetDates[];
  dataObj?: users | tweets | Tweets | null;
  dataBool?: boolean;
}

declare global {
  namespace Express {
    interface Response {
      locals: Locals;
      typedLocals: Locals;
    }
  }
}
