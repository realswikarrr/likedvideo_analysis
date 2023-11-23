import { Router } from "express";
import passport from "passport";
// import revokeToken from "../middleware/revoketoken";

const router = Router();

router.get(
  "/login",
  passport.authenticate("google", {
    scope: [
      "profile",
      "https://www.googleapis.com/auth/youtube.readonly",
      "https://www.googleapis.com/auth/youtube",
      "email",
    ],
    accessType: "offline",
    approvalPrompt: "force",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3001/dashboard",
    failureRedirect: "/",
  })
);

router.get("/protectedRedirect", (req, res) => {
  res.status(400).json({ message: "You are not logged In" });
});

router.get("/logout", (req, res) => {
  // Clear the user's session
  req.logout(() => {
    // Additional logic after logout (if needed)
    // For example, you can redirect the user to a specific page after logout
    // Adjust the redirection URL as needed
  });
});

export default router;
