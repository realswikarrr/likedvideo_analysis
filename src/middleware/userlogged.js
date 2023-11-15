function userLogged(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/api/auth/protectedRedirect");
  }
}

export default userLogged;
