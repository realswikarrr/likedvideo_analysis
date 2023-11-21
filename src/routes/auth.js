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
    successRedirect: "http://localhost:3001/login",
    failureRedirect: "/",
  })
);

router.get("/loggedIn", (req, res) => {
  res.render("loggedIn");
  res.status(200);
});

router.get("/protectedRedirect", (req, res) => {
  res.render("protected");
  res.status(400);
});

router.get("/logout", (req, res) => {
  // Clear the user's session
  req.logout(() => {
    // Additional logic after logout (if needed)
    // For example, you can redirect the user to a specific page after logout

    res.redirect("/"); // Adjust the redirection URL as needed
  });
});

export default router;
