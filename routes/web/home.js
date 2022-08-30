var express = require("express");
var passport = require("passport");
const { deleteOne } = require("../../models/user");

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var User = require("../../models/user");

var router = express.Router();


router.get("/", function (req, res) {
   // console.log("hello I'm on the start page");
   res.render("home/");
});

router.get("/home", function (req, res) {
   res.render("home/home");
});

router.get("/about", function (req, res) {
   res.render("home/about");
});

router.get("/posts", ensureAuthenticated, function(req, res){
   res.render("home/posts")
});

router.get("/login", function (req, res) {
   res.render("home/login")
});

router.get("/logout", function(req, res){
   //console.log("inside logout");
   req.logout(function(err){
      if (err) { return next(err); }
      res.redirect("/home");
   });
   //res.redirect("/home");
});

router.post("/login", passport.authenticate("login", {
   successRedirect: "/",
   failureRedirect: "/login",
   failureFlash: true
}));

router.get("/signup", function (req, res) {
   res.render("home/signup")
});

router.post("/signup", function (req, res, next) {
   var username = req.body.username;
   var email = req.body.email;
   var password = req.body.password;

   console.log("inside signup");

   if (!username || !email || !password) {
      //req.flash("info", "Enter Required field");
      return next();
   }

   User.findOne({ email: email }, function (err, user) {
      if (err) { return next(err); }
      if (user) {
         req.flash("error", "There's already an account with this email");
         return res.redirect("/signup");
      }

      var newUser = new User({
         username: username,
         password: password,
         email: email
      });
      console.log("inside signup save");

      newUser.save(next);

   });

}, passport.authenticate("login", {
   successRedirect: "/",
   failureRedirect: "/signup",
   failureFlash: true
}));

module.exports = router;