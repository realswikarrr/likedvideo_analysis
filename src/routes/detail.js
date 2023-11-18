import { Router } from "express";

import expressAsyncHandler from "express-async-handler";
import userLogged from "../middleware/userlogged.js";
import videoDetails from "../db/Schema/VideoDetails.js";

const router = Router();

router.get(
  "/mostWatchedChannel",
  userLogged,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await videoDetails
        .findOne({ userEmail: res.req.user.email })
        .exec();

      let watchedChannel = [];

      user.data.map((user) => watchedChannel.push(user.channelTitle));

      const sortedChannel = watchedChannel.sort();

      let countWatchedChannels = {};
      let count = 0;
      let current = null;

      for (let i = 0; i < sortedChannel.length; i++) {
        if (sortedChannel[i] != current) {
          if (count > 0) {
            countWatchedChannels[current] = count;
          }

          current = sortedChannel[i];
          count = 1;
        } else {
          count++;
        }
      }

      if (countWatchedChannels) {
        res
          .status(200)
          .json({ message: "Here is your data", data: countWatchedChannels });
      } else {
        res.status(401).json({ message: "not found" });
      }
    } catch (err) {
      res
        .status(200)
        .json({ message: "Something went wrong while fetching the data", err });
    }
  })
);

export default router;
