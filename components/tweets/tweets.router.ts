import TweetsMiddleware from "./tweets.middleware";
import TweetsController from "./tweets.controller";
import { RouterConfig } from "../../configs/config.routes";

const tweetsRouter = new RouterConfig();
tweetsRouter.name = "api/tweets";
tweetsRouter.router
  .post("/:id", [TweetsMiddleware.validateTweetExists], TweetsController.addOne)
  .get(
    "/dates",
    [TweetsMiddleware.validateTweetDates],
    TweetsController.getAllTweets
  )
  .get(
    "/:id",
    [TweetsMiddleware.validateTweetExists],
    TweetsController.getTweet
  )
  .get(
    "/",
    [TweetsMiddleware.validateTweetExists],
    TweetsController.getAllTweets
  );

// .patch("/:id", [ UsersMiddleware.validateUserExists, UsersMiddleware.validateUserUpdates ], UsersController.patchUser)
// .delete("/:id", [ UsersMiddleware.validateUserExists ], UsersController.deleteUser);

export default tweetsRouter;
