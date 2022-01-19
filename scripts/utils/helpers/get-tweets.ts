import axios from "axios";
import nodemailer from "nodemailer";
import cron from "node-cron";

import convertDate from "../../utils/convert-date";
import configObj from "../../../configs/config.vars";
import TweetsServices from "../../../components/tweets/tweets.services";
import { Tweet } from "../../..//types/tweets";

const insertTweets = async (): Promise<unknown | boolean> => {
  const TWEET_OPTIONS = {
    USER_ID: "133110529",
    MAX_RESULTS: 100,
    TWEET_FIELDS: "created_at"
  };

  Object.freeze(TWEET_OPTIONS);
  const yesterday = new Date(Date.now() - 864e5);
  const date = convertDate(yesterday);

  const startTime = `${date}T12:00:00Z`;
  const endTime = `${date}T23:59:59Z`;

  const returnOptions = {
    value: false,
    body: "No tweets found for this day"
  };

  if (configObj.authorization) {
    try {
      const response = await axios.get(
        `https://api.twitter.com/2/users/${TWEET_OPTIONS.USER_ID}/tweets?max_results=${TWEET_OPTIONS.MAX_RESULTS}&start_time=${startTime}&end_time=${endTime}&tweet.fields=${TWEET_OPTIONS.TWEET_FIELDS}`,
        {
          headers: {
            Authorization: configObj.authorization
          }
        }
      );

      const tweets = response.data.data;

      if (tweets) {
        const allTweets = await TweetsServices.findAll();
        const tweetIds = allTweets.map((tweet) => tweet.id);
        const uniqueTweets = tweets.filter(
          (tweet: Tweet) => !tweetIds.includes(tweet.id)
        );

        if (uniqueTweets.length > 0) {
          returnOptions.body = uniqueTweets.length + " tweets inserted.";
          returnOptions.value = uniqueTweets.length > 0;
          await TweetsServices.createMany(uniqueTweets);
        }
      }

      //Update mailing options to Momus.io
      const transporter = nodemailer.createTransport(
        configObj.transportOptions
      );
      configObj.mailOptions.text = returnOptions.body;

      transporter.sendMail(configObj.mailOptions, (err, res) => {
        if (err) {
          console.log(err);
        } else if (res) {
          console.log(res);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  return returnOptions.value;
};

(() => {
  cron.schedule("36-45 * * * *", async () => await insertTweets());
})();
