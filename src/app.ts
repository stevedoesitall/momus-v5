import path from "node:path";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import ejs from "ejs";
import expressEjsLayouts from "express-ejs-layouts";

import ApiRoutes from "./routes/api.routes";
import PagesRoutes from "./routes/pages.routes";
// Update this to send to PG
// const today = new Date().toDateString();
// const logFile = `./logs/${today.replaceAll(" ", "_")}.txt`;
// const logFilePath = path.resolve(logFile);
// const accessLogStream = fs.createWriteStream(logFilePath, { flags: "a" });

const apiRoutes = new ApiRoutes();
const pagesRoutes = new PagesRoutes().router;

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
    contentSecurityPolicy: false
  })
);

app.use(morgan(":method _ :url _ :status _ :response-time"));

app.use(apiRoutes.getUserRoutes().name, apiRoutes.getUserRoutes().router);
app.use(apiRoutes.getTweetRoutes().name, apiRoutes.getTweetRoutes().router);
app.use("", pagesRoutes);

app.engine("html", ejs.renderFile);

app.set("view engine", "html");
app.set("views", path.join(viewsPath));
app.set("view options", {
  delimiter: "#",
  openDelimiter: "[",
  closeDelimiter: "]"
});

export default app;
