import cors from "cors";
import express, { Application } from "express";
import AppRoutes from "./routes";

const appRoutes = new AppRoutes();
const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(appRoutes.getUserRoutes().name, appRoutes.getUserRoutes().router);

export default app;