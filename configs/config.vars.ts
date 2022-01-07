import dotenv from "dotenv";
import * as SMTPTransport from "nodemailer/lib/smtp-transport";
import * as Mailer from "nodemailer/lib/mailer";

dotenv.config();

const transportOptions: SMTPTransport.Options = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT) : undefined,
  secure: false,
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  debug: false,
  logger: true
};

const mailOptions: Mailer.Options = {
  from: "plex.requester@yahoo.com",
  to: "stephenagiordano@gmail.com",
  subject: "New Plex Request!",
  text: ""
};

const configObj = {
  authorization: process.env.AUTHORIZATION,
  databaseURL: process.env.DATABASE_URL,
  devURL: process.env.DEV_DB_URL,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  transportOptions,
  mailOptions
};

export default configObj;
