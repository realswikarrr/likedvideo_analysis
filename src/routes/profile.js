import { Router } from "express";
import { google as googleApi } from "googleapis";
import axios from "axios";

const router = Router();

const OAuth2 = googleApi.auth.OAuth2;

function userLogged(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/api/auth/google");
  }
}

router.get("/profile", userLogged, async (req, res) => {
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

    // Continue with the API request using the refreshed tokens
    googleApi
      .youtube({
        version: "v3",
        auth: oauth2Client,
      })
      .videos.list(
        {
          part: "snippet",
          myRating: "like",
        },
        async function (err, data, response) {
          try {
            if (data) {
              res.status(200).json({
                message: "Data Received Success",
                data: data.data.items,
              });
            } else {
              res.status(400).json({ message: "errr no response", err: err });
            }
          } catch (err) {
            res.status(200).json({ message: "Something Went Wrong", err });
          }
        }
      );
  } catch (err) {
    res
      .status(400)
      .json({ message: "something went wrong fetching the data", err });
  }
});

export default router;
