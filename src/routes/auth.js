import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    accessType: "offline",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/profile",
    failureRedirect: "/",
  })
);

export default router;
