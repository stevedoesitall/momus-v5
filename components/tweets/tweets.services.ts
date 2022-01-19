import { PrismaClient, tweets } from "@prisma/client";
import type { Tweet, Tweets, TweetDates } from "../../types/tweets";
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

  async findByDate(value: string): Promise<Tweets | null> {
    const tweetsByDate: Tweet[] =
      await prisma.$queryRaw`SELECT * FROM tweets WHERE TO_CHAR(created_at AT TIME ZONE 'GMT-05:00 DST', 'YYYY-MM-DD') = ${value} ORDER BY created_at ASC`;
    const allTweets = await this.findAll();
    const linkedDates = getLinkedTweets(allTweets, value);
    const tweetsWithDates: Tweets = {
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

  async findAllDates(): Promise<TweetDates[]> {
    const tweetDates: TweetDates[] =
      await prisma.$queryRaw`SELECT DISTINCT TO_CHAR(created_at AT TIME ZONE 'GMT-05:00 DST', 'YYYY-MM-DD') as date from tweets ORDER BY date ASC`;
    return tweetDates;
  }

  async createOne(tweet: Tweet): Promise<boolean> {
    const wasAdded = await prisma.tweets.create({
      data: {
        created_at: tweet.created_at,
        text: tweet.text,
        id: tweet.id
      }
    });

    return wasAdded ? true : false;
  }

  async createMany(tweets: Tweet[]): Promise<number> {
    const wasAdded = await prisma.tweets.createMany({
      data: tweets
    });

    return wasAdded.count;
  }
}

export default new TweetsServices();
