import app from "./bin/app";
import configObj from "../configs/config.vars";

const { port } = configObj;

app.listen(port, (): void => {
  console.log(`Connected on port ${port}`);
});
