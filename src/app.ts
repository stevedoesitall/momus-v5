import path from "node:path";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import expressEjsLayouts from "express-ejs-layouts";

import ApiRoutes from "../routes/api.routes";

// Update!
import { pagesRouter } from "../routes/pages.routes";

// Update this to send to PG
// const today = new Date().toDateString();
// const logFile = `./logs/${today.replaceAll(" ", "_")}.txt`;
// const logFilePath = path.resolve(logFile);
// const accessLogStream = fs.createWriteStream(logFilePath, { flags: "a" });

const appRoutes = new ApiRoutes();
const app: Application = express();
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(publicPath));
app.use(expressEjsLayouts);

app.use(cors());

app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);

app.use(morgan(":method _ :url _ :status _ :response-time"));

app.use(appRoutes.getUserRoutes().name, appRoutes.getUserRoutes().router);
app.use(appRoutes.getTweetRoutes().name, appRoutes.getTweetRoutes().router);

app.set("view engine", "ejs");
app.set("views", path.join(viewsPath));
app.set("view options", { 
	delimiter: "#",
	openDelimiter: "{",
	closeDelimiter: "}" 
});

app.use("", pagesRouter);

app.get("/", (req: Request, res: Response) => {
	res.render("pages/index");
});

export default app;