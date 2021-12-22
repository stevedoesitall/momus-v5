import { tweets } from ".prisma/client";

const getLinkedTweets = (allTweets: tweets[] | null, value: string) => {
	const tweetValues: string[] = [];

	if (allTweets?.length) {
		allTweets.forEach(tweet => {
			console.log(tweet);
		});
	}

	// const index = tweetValues.indexOf(value);
	// const prev = index > 0 ? tweetValues[index - 1] : null;
	// const next = index < tweetValues.length - 1 ? tweetValues[index + 1] : null;

	// return {
	// 	prev,
	// 	next
	// };
};

export default getLinkedTweets;