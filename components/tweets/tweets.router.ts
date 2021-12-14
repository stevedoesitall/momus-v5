import TweetsMiddleware from "./tweets.middleware";
import TweetsController from "./tweets.controller";
import { RouterConfig } from "../../configs/config.routes";

const tweetsRouter = new RouterConfig();
tweetsRouter.name = "tweets";

tweetsRouter.router
	// .post("/", [ UsersMiddleware.validateUserFields, UsersMiddleware.validateUserIsNew ], UsersController.createUser)
	.get("/:id", [ TweetsMiddleware.validateTweetExists ], TweetsController.getTweet)
	.get("/", [ TweetsMiddleware.validateTweetExists ], TweetsController.getAllTweets);
// .patch("/:id", [ UsersMiddleware.validateUserExists, UsersMiddleware.validateUserUpdates ], UsersController.patchUser)
// .delete("/:id", [ UsersMiddleware.validateUserExists ], UsersController.deleteUser);

export default tweetsRouter;