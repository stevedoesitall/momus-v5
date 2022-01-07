interface Tweet {
  id: string;
  text: string;
  created_at: Date;
  users_tweets?: string[];
  prev?: Tweet | null;
  next?: Tweet | null;
}

interface TweetMeta {
  oldest_id: string | null;
  newest_id: string | null;
  result_count: number | null;
}

interface Tweets {
  tweets: Tweet[];
  prev: string | null;
  next: string | null;
  meta?: TweetMeta | null;
}

export { Tweet, Tweets };
