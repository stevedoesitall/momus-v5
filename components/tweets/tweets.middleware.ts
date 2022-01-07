import { Request, Response, NextFunction } from "express";
import TweetsServices from "./tweets.services";
import { Tweet } from "../../types/tweets";
class TweetsMiddleware {
  async validateTweetExists(req: Request, res: Response, next: NextFunction) {
    if (req.params.id) {
      const tweetId: string = req.params.id;
      const tweet = await TweetsServices.findOne(tweetId, "id");
      const createdAt = new Date(req.body.created_at);
      let method;

      if (req.route.methods.get) {
        method = "get";
      } else if (req.route.methods.post) {
        method = "post";
      } else if (req.route.methods.delete) {
        method = "delete";
      } else if (req.route.methods.patch) {
        method = "patch";
      } else {
        res.send({
          error: "Unauthorized method.",
          ok: false
        });
      }

      if (!tweet) {
        if (method === "get" || method === "delete" || method === "patch") {
          return res.status(404).send({
            error: "Tweet does not exist."
          });
        } else {
          const newTweet: Tweet = {
            id: tweetId,
            text: req.body.text,
            created_at: createdAt
          };
          await TweetsServices.createOne(newTweet);
          res.typedLocals = res.locals;
          res.typedLocals.dataBool = true;
        }
      } else {
        if (method === "post") {
          return res.status(404).send({
            error: "Tweet already exists for this ID."
          });
        } else {
          res.typedLocals = res.locals;
          res.typedLocals.dataObj = tweet;
        }
      }
    } else if (req.query.date) {
      const date = req.query.date;

      if (typeof date === "string") {
        const data = await TweetsServices.findByDate(date);

        if (data?.tweets?.length === 0) {
          return res.status(404).send({
            error: "No tweets found for this date."
          });
        }

        res.typedLocals = res.locals;
        res.typedLocals.dataObj = data;
      } else {
        return res.status(404).send({
          error: "Invalid date."
        });
      }
    } else {
      const tweets = await TweetsServices.findAll();

      if (!tweets.length) {
        return res.status(404).send({
          error: "No tweets found."
        });
      }

      res.typedLocals = res.locals;
      res.typedLocals.dataArr = tweets;
    }

    next();
  }

  async validateTweetDates(req: Request, res: Response, next: NextFunction) {
    const tweetDates = await TweetsServices.findAllDates();

    if (!tweetDates) {
      return res.status(404).send({
        error: "No tweet dates found."
      });
    }

    res.typedLocals = res.locals;
    res.typedLocals.dataArr = tweetDates;

    next();
  }
}

export default new TweetsMiddleware();
