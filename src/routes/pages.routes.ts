import { Request, Response, Router } from "express";
import { RouterConfig } from "../../configs/config.routes";
import TweetsServices from "../../components/tweets/tweets.services";

class PagesRoutes extends RouterConfig {
	public router: Router;

	constructor(router = Router()) {
		super();
		this.router = router;

		router
			.get("/about", (req: Request, res: Response) => {
				res.render("pages/about");
			})

			.get("/", async (req: Request, res: Response) => {
				const results = await TweetsServices.findOne("13942811510");
				console.log(results);
				res.render("pages/index");
			});
	}
}

export default PagesRoutes;
