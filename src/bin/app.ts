import path from "node:path";
import cors from "cors";

import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import ApiRoutes from "./routes";

// Update this to send to PG
// const today = new Date().toDateString();
// const logFile = `./logs/${today.replaceAll(" ", "_")}.txt`;
// const logFilePath = path.resolve(logFile);
// const accessLogStream = fs.createWriteStream(logFilePath, { flags: "a" });

const apiRoutes = new ApiRoutes();

const app: Application = express();

const publicPath = path.join(__dirname, "../../public");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(publicPath));

app.use(cors());

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use(morgan(":method _ :url _ :status _ :response-time"));

app.use(apiRoutes.getUserRoutes().name, apiRoutes.getUserRoutes().router);
app.use(apiRoutes.getTweetRoutes().name, apiRoutes.getTweetRoutes().router);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});

export default app;
