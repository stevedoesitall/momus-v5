import { Request, Response, NextFunction } from "express";
// import { CreateTweet } from "../../types/tweets.model";
import TweetsServices from "./tweets.services";

class TweetsMiddleware {
	async validateTweetExists(req: Request, res: Response, next: NextFunction) {
		if (req.params.id) {
			const tweetId: string = req.params.id;
			const tweet = await TweetsServices.findOne(tweetId, "id");
			
			if (!tweet) {
				return res.status(404).send({
					"error": "User does not exist."
				});
			}

			res.typedLocals = res.locals;
			res.typedLocals.dataObj = tweet;

		} else {
			const tweets = await TweetsServices.findAll();

			if (!tweets.length) {
				return res.status(404).send({
					"error": "No users found."
				});
			}

			res.typedLocals = res.locals;
			res.typedLocals.dataArr = tweets;
		}

		next();
	}
}

export default new TweetsMiddleware();