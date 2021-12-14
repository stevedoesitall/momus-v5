interface CreateTweet {
    id: string;
    text: string;
    created_at: Date;
    users_tweets: string[];
}

export { CreateTweet };