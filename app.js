var express = require("express");
var app = express();
app.use(require("express-session")({
    secret: "Yes, this is dog. What are the mission parameters?",
    resave: false,
    saveUninitialized: false
}));



var bodyParser = require("body-parser");
var User = require("./models/user");



var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
// Set passport up
app.use(passport.initialize());
app.use(passport.session());
// Read sesion, take data from session, unencode data
// from session.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/auth_demo");

app.set("view engine", "ejs");






app.get("/", function(req, res){
    res.render("home");
});


app.get("/secret", function(req, res) {
   res.render("secret") ;
});












app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Secret Page Server Online");
});