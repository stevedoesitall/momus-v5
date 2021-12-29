import { Request, Response, NextFunction } from "express";
import TweetsServices from "./tweets.services";

class TweetsMiddleware {
	async validateTweetExists(req: Request, res: Response, next: NextFunction) {
		if (req.params.id) {
			const tweetId: string = req.params.id;
			const tweet = await TweetsServices.findOne(tweetId, "id");
			
			if (!tweet) {
				return res.status(404).send({
					"error": "Tweet does not exist."
				}); 
			} 

			res.typedLocals = res.locals;
			res.typedLocals.dataObj = tweet;

		} else if (req.query.date) {
			const date = req.query.date;

			if (typeof date === "string") {
				const tweets = await TweetsServices.findByDate(date);

				if (!tweets) {
					return res.status(404).send({
						"error": "No tweets found for this date."
					});
				}
	
				res.typedLocals = res.locals;
				res.typedLocals.dataObj = tweets;
			} else {
				return res.status(404).send({
					"error": "Invalid date."
				});
			}

		} else {
			const tweets = await TweetsServices.findAll();
			
			if (!tweets.length) {
				return res.status(404).send({
					"error": "No tweets found."
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
				"error": "No tweet dates found."
			});
		}

		res.typedLocals = res.locals;
		res.typedLocals.dataArr = tweetDates;

		next();
	}
}

export default new TweetsMiddleware();