import { PrismaClient, tweets } from "@prisma/client";
// import { CreateTweet } from "../../types/tweets.model";

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

	async findByDate(value: string): Promise<tweets[] | null> {
		const tweets: tweets[] = await prisma.$queryRaw`SELECT * FROM tweets WHERE TO_CHAR(created_at AT TIME ZONE 'GMT-05:00 DST', 'YYYY-MM-DD') = ${value} ORDER BY created_at ASC`;

		return tweets;
	}

	async findAll(): Promise<tweets[]> {
		const allTweets: tweets[] = await prisma.tweets.findMany();

		return allTweets;
	}
}

export default new TweetsServices();