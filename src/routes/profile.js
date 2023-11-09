import { Router } from "express";
import { google } from "googleapis";

const router = Router();

const OAuth2 = google.auth.OAuth2;

function userLogged(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/api/auth/google");
}

router.get("/profile", userLogged, (req, res) => {
  console.log("i am here", req.user);

  var oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );

  oauth2Client.credentials = {
    access_token: req.user.access_token,
    refresh_token: req.user.refresh_token,
  };

  google
    .youtube({
      version: "v3",
      auth: oauth2Client,
    })
    .videos.list(
      {
        part: "snippet",
        myRating: "like",
        headers: {},
      },
      async function (err, data, response) {
        try {
          if (!data) {
            res.status(201).json({ message: "Data not found" });
          }

          res
            .status(200)
            .json({ message: "Data Received Sucess", data: data.data.items });
        } catch (err) {
          res.status(200).json({ message: "Something Went Wrong", err });
        }
      }
    );
});

export default router;
