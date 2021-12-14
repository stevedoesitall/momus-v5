import { PrismaClient, tweets } from "@prisma/client";
import { CreateTweet } from "../../types/tweets.model";

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

	async findAll(): Promise<tweets[]> {
		const allTweets: tweets[] = await prisma.tweets.findMany();

		return allTweets;
	}
}

export default new TweetsServices();