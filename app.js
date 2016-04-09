var express = require("express");
var app = express();
app.use(require("express-session")({
    secret: "Yes, this is dog. What are the mission parameters?",
    resave: false,
    saveUninitialized: false
}));



var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var User = require("./models/user");



var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
// Set passport up
app.use(passport.initialize());
app.use(passport.session());
// Read sesion, take data from session, unencode data
// from session.
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/auth_demo");

app.set("view engine", "ejs");



////////////////////////////// ROUTES ////////////////////////////// 


app.get("/", function(req, res){
    res.render("home");
});


app.get("/secret", isLoggedIn, function(req, res) {
   res.render("secret") ;
});


// AUTH routes

// Show sign-up form
app.get("/register", function(req, res) {
   res.render("register") ;
});


// Handle sign-ups
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
               res.redirect("/secret") ;
            });
        };
    });
});


// LOGIN ROUTES

// render login form
app.get("/login", function(req, res) {
   res.render("login");
});


// login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
    
});


app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/");
});


function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Secret Page Server Online");
});