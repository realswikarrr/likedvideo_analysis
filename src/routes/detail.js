import { Router } from "express";

// import videoDetails from "../db/Schema/VideoDetails";
import expressAsyncHandler from "express-async-handler";
import userLogged from "../middleware/userlogged.js";
import videoDetails from "../db/Schema/VideoDetails.js";

const router = Router();

router.get(
  "/mostWatchedChannel",
  userLogged,
  expressAsyncHandler(async (req, res) => {
    const user = await videoDetails
      .findOne({ userEmail: res.req.user.email })
      .exec();

    console.log(user);
  })
);

export default router;
