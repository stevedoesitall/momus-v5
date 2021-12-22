import usersRouter from "../../components/users/users.router";
import tweetsRouter from "../../components/tweets/tweets.router";

class ApiRoutes {
	public getUserRoutes() {
		return usersRouter;
	}

	public getTweetRoutes() {
		return tweetsRouter;
	}
}

export default ApiRoutes;