import { Request, Response } from "express";

class TweetsController {
	async getTweet(req: Request, res: Response) {
		try {
			const tweet = res.typedLocals.dataObj;
        
			return res.status(200).send({
				"data": tweet,
				"ok": true
			});
		}
        
		catch (error) {
			return res.status(500).send({
				"error": "Bad request.",
				"ok": false
			});
		}
        
		finally {
			console.log("Finished.");
		}
	}

	async getAllTweets(req: Request, res: Response) {
		try {
			const tweets = res.typedLocals.dataArr;
			return res.status(200).send({
				"data": tweets,
				"ok": true
			});
		}
        
		catch (error) {
			return res.status(500).send({
				"error": "Bad request.",
				"ok": false
			});
		}
        
		finally {
			console.log("Finished.");
		}
	}

	async getTweetDates(req: Request, res: Response) {
		try {
			const tweetDates = res.typedLocals.dataArr;
			
			return res.status(200).send({
				"data": tweetDates,
				"ok": true
			});
		}
        
		catch (error) {
			return res.status(500).send({
				"error": "Bad request.",
				"ok": false
			});
		}
        
		finally {
			console.log("Finished.");
		}
	}
}

export default new TweetsController();