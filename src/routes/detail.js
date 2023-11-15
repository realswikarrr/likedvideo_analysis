import { Router } from "express";

// import videoDetails from "../db/Schema/VideoDetails";
import expressAsyncHandler from "express-async-handler";
import userLogged from "../middleware/userlogged.js";

const router = Router();

router.get(
  "/mostWatchedChannel",
  userLogged,
  expressAsyncHandler(async (req, res) => {
    console.log("Its Workign");
  })
);

export default router;
