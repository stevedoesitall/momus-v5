import dotenv from "dotenv";

dotenv.config();

const configObj = {
  databaseURL: process.env.DATABASE_URL,
  devURL: process.env.DEV_DB_URL,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT
};

export default configObj;
