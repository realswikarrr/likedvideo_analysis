import { Router } from "express";
import passport from "passport";
// import revokeToken from "../middleware/revoketoken";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "https://www.googleapis.com/auth/youtube.readonly",
      "email",
    ],
    accessType: "offline",
    approvalPrompt: "force",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/profile",
    failureRedirect: "/",
  })
);

router.get("/logout", (req, res) => {
  // Clear the user's session
  req.logout(() => {
    // Additional logic after logout (if needed)
    // For example, you can redirect the user to a specific page after logout

    res.redirect("/"); // Adjust the redirection URL as needed
  });
});

export default router;
