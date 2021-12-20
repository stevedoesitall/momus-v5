import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/about", (req: Request, res: Response) => {
	res.render("pages/about");
});

export { router as pagesRouter };