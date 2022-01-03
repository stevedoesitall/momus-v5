interface Tweet {
  id: string;
  text: string;
  created_at: Date;
  users_tweets?: string[];
  prev?: Tweet | null;
  next?: Tweet | null;
}

interface Tweets {
  tweets: Tweet[];
  prev: string | null;
  next: string | null;
}

export { Tweet, Tweets };
