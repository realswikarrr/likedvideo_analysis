import { Router } from "express";
import { google as googleApi } from "googleapis";
import videoDetails from "../db/Schema/VideoDetails.js";

import expressAsyncHandler from "express-async-handler";

const router = Router();

const OAuth2 = googleApi.auth.OAuth2;

function userLogged(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/api/auth/google");
  }
}

router.get(
  "/profile",
  userLogged,
  expressAsyncHandler(async (req, res) => {
    // Check and refresh the token

    console.log(req.user);
    // Use the refreshed tokens for authentication
    try {
      var oauth2Client = new OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URL
      );

      oauth2Client.credentials = {
        access_token: req.user.access_token,
        refresh_token: req.user.refresh_token,
      };

      const youtube = googleApi.youtube({
        version: "v3",
        auth: oauth2Client,
      });

      //  Taking next token and getting all the videos
      const getAllVideos = async (pageToken = null) => {
        try {
          const response = await youtube.videos.list({
            part: "snippet,contentDetails",
            myRating: "like",
            maxResults: 50, // Adjust the number of results per page as needed
            pageToken: pageToken,
          });

          const items = response.data.items;

          const nextPageToken = response.data.nextPageToken;

          if (nextPageToken) {
            // If there are more pages, recursively call the function
            const nextItems = await getAllVideos(nextPageToken);
            return items.concat(nextItems);
          } else {
            return items;
          }
        } catch (error) {
          throw error;
        }
      };

      try {
        const allVideos = await getAllVideos();

        const simplifiedData = allVideos.map((item) => {
          return {
            videoTitle: item.snippet.title || "",
            channelTitle: item.snippet.channelTitle || "",
            videoTags: item.snippet.tags || "",
            categoryId: item.snippet.categoryId || "",
          };
          // return {
          //   videoTitle: item.snippet.title,
          //   channelTitle: item.snippet.channelTitle,
          //   videoTags: item.snippet.tags,
          //   categoryId: item.snippet.categoryId,
          // };
        });

        try {
          for (const data of simplifiedData) {
            const videoDetailsInstance = new videoDetails(data);
            await videoDetailsInstance.save();
          }
        } catch (err) {
          console.log("Individual insertions successful");
        }

        res.status(200).json({
          message: "Data Received Success",
          // data: simplifiedData,
        });
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ message: "Something Went Wrong here", error: error });
      }
    } catch (err) {
      res
        .status(400)
        .json({ message: "something went wrong fetching the data", err });
    }
  })
);

export default router;
