import usersRouter from "../components/users/users.router";

class AppRoutes {
	public getUserRoutes() {
		return usersRouter;
	}

	public getTweetRoutes() {
		return true;
	}
}

export default AppRoutes;