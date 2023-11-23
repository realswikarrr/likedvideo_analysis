// TODO: Find out why it is not working in client side

function userLogged(req, res, next) {
  if (req.user) {
    return next();
  } else {
    res.redirect("/api/auth/protectedRedirect");
  }
}

export default userLogged;
