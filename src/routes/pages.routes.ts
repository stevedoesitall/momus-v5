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
        const allDates = await TweetsServices.findAllDates();
        res.render("pages/index", {
          allDates
        });
      })

      .get("/content", async (req: Request, res: Response) => {
        const query = req.query.date;

        if (typeof query === "string") {
          const data = await TweetsServices.findByDate(query);
          res.render("pages/content", {
            data,
            date: query
          });
        }
      });
  }
}

export default PagesRoutes;
