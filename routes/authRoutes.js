const passport = require("passport");

module.exports = app => {
  app.get("/login", passport.authenticate("auth0", {}));

  app.get(
    "/callback",
    passport.authenticate("auth0"),
    (req, res) => {
      res.redirect("/concerns");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);

  });
};
