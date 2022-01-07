import { users, tweets } from "@prisma/client";
import { Tweets } from "./tweets";

interface Locals {
  dataArr?: users[] | tweets[];
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
