interface CreateTweet {
    id: string;
    text: string;
    created_at: Date;
    users_tweets: string[];
    prev?: CreateTweet | null;
    next?: CreateTweet | null;
}

export { CreateTweet };