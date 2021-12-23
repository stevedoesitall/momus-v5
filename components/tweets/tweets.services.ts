import { PrismaClient, tweets } from "@prisma/client";
import { CreateTweet, TweetReturn } from "../../types/tweets.model";
import getLinkedTweets from "../../utils/get-linked-tweets";
const prisma = new PrismaClient();

class TweetsServices { 
	async findOne(value: string, parameter = "id"): Promise<tweets | null> {
		const tweet = await prisma.tweets.findFirst({
			where: {
				[parameter]: value
			}
		});
	
		return tweet;
	}

	async findByDate(value: string): Promise<TweetReturn | null> {
		const tweetsByDate: CreateTweet[] = await prisma.$queryRaw`SELECT * FROM tweets WHERE TO_CHAR(created_at AT TIME ZONE 'GMT-05:00 DST', 'YYYY-MM-DD') = ${value} ORDER BY created_at ASC`;
		const allTweets = await this.findAll();
		const linkedDates = getLinkedTweets(allTweets, value);
		const tweetsWithDates: TweetReturn = {
			tweets: tweetsByDate,
			prev: linkedDates.prev,
			next: linkedDates.next
		};

		return tweetsWithDates;
	}

	async findAll(): Promise<tweets[]> {
		const allTweets: tweets[] = await prisma.tweets.findMany({
			orderBy: {
				created_at: "asc"
			}
		});

		return allTweets;
	}

	// async findAllDates(date: string) {
	// 	const tweets = await this.findAll();
			
	// }
}

export default new TweetsServices();