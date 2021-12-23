interface CreateTweet {
    id: string;
    text: string;
    created_at: Date;
    users_tweets: string[];
    prev?: CreateTweet | null;
    next?: CreateTweet | null;
}

interface LinkedValues {
    prev: string | null;
    next: string | null;
}

interface TweetReturn {
    tweets: CreateTweet[];
    prev: string | null;
    next: string | null;
}

export { CreateTweet, LinkedValues, TweetReturn };