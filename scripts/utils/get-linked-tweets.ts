import { tweets } from ".prisma/client";
import convertDate from "./convert-date";
import { Tweets } from "../../types/tweets";

const getLinkedTweets = (
  allTweets: tweets[] | null,
  value: string
): Omit<Tweets, "tweets"> => {
  const convertedDate: string = convertDate(value + "T12:00:00+05:00");
  const tweetValues: string[] = [];

  if (allTweets?.length) {
    allTweets.forEach((tweet) => {
      if (tweet.created_at) {
        const tweetDate = convertDate(tweet.created_at);
        tweetValues.includes(tweetDate) ? null : tweetValues.push(tweetDate);
      }
    });
  }

  const index: number = tweetValues.indexOf(convertedDate);
  const prev = index > 0 ? tweetValues[index - 1] : null;
  const next = index < tweetValues.length - 1 ? tweetValues[index + 1] : null;

  return {
    prev,
    next
  };
};

export default getLinkedTweets;
