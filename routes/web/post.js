var express = require("express");

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var Post = require("../../models/post");

var router = express.Router();

router.use(ensureAuthenticated);

router.get("/", function(req, res){
    Post.find({userID:req.user._id}).exec(function(err, posts){
        if(err){console.log(err);}

        res.render("post/posts", {posts:posts});
    });
 });


 router.get("/add", function(req, res){
    res.render("post/addpost");
 });

 router.post("/add", function(req, res){
   console.log("inside post add");
    var newPost = new Post({
        title:req.body.title,
        content:req.body.content,
        userID:req.user._id
    });
    if (newPost.title) {
        newPost.save(function(err,post){
            if(err){console.log(err);}
            res.redirect("/posts");
        });
    } else {
        req.flash("info", "Enter Required field");
        return res.redirect("/posts/add");
    }
 });




module.exports = router;
