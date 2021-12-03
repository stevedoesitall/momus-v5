import cors from "cors";
import express from "express";
import UsersRouter from "../components/users/users.router";

const app: express.Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(UsersRouter.getName(), UsersRouter.getRoutes());

export default app;