import { Router } from "express";

// import videoDetails from "../db/Schema/VideoDetails";
import expressAsyncHandler from "express-async-handler";

const router = Router();

function userLogged(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/api/mostWatchedChannel");
  } else {
    res.redirect("/api/auth/google");
  }
}

router.get(
  "/mostWatchedChannel",
  userLogged,
  expressAsyncHandler(async (req, res) => {
    console.log("Its Workign");
  })
);

export default router;
