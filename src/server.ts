import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port: string | undefined = process.env.PORT;

app.listen(port, (): void => {
	console.log(`Connected on port ${port}`);
});