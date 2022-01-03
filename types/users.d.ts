interface CreateUser {
  id: string;
  user_name: string;
  password: string;
  email?: string;
  last_pageview?: string;
  last_update_date?: Date;
  latest_session_id?: string;
  is_admin?: boolean;
  is_verified?: boolean;
  token_time?: Date;
  verify_time?: Date;
  token?: string;
  reset_token?: string;
  users_tweets: string[];
}

interface UpdateUser extends Partial<CreateUser> {
  id: string;
}

export { CreateUser, UpdateUser };
