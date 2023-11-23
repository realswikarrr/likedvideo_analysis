import { Router } from "express";

import expressAsyncHandler from "express-async-handler";
import userLogged from "../middleware/userlogged.js";
import videoDetails from "../db/Schema/VideoDetails.js";
import categoryData from "../data/categoryData.js";

const router = Router();

router.get(
  "/checkLoggedIn",
  userLogged,
  expressAsyncHandler(async (req, res) => {
    console.log("Its Loggedd In");
  })
);

router.get(
  "/userDetails",
  userLogged,
  expressAsyncHandler(async (req, res) => {
    try {
      const userDetails = {
        email: req.user.email,
        name: req.user.name,
      };
      res.status(200).json({ message: "User Details", data: userDetails });
    } catch (err) {
      res.status(400);
      console.log(err);
    }
  })
);

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

router.get(
  "/mostLikedCategory",
  userLogged,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await videoDetails
        .findOne({ userEmail: res.req.user.email })
        .exec();

      let categoryIds = [];

      user.data.map((user) => categoryIds.push(user.categoryId));

      let sortedCatergoryIds = categoryIds.sort();

      let categoryList = new Object();
      let count = 0;
      let current = null;

      for (let i = 0; i <= sortedCatergoryIds.length; i++) {
        if (sortedCatergoryIds[i] != current) {
          if (count > 0) {
            categoryList[categoryData[current]] = count;
          }
          current = sortedCatergoryIds[i];
          count = 1;
        } else {
          count++;
        }
      }

      if (categoryList) {
        res
          .status(200)
          .json({ message: "Data Fetched Sucessfully", data: categoryList });
      } else {
        res.status(401).json({ message: "Something Bad Bad Happened" });
      }
    } catch (err) {
      res.status(400).json({ message: "Something Went Wrong", err: err });
    }
  })
);

export default router;
