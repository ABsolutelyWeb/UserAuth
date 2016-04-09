var mongoose = require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Grab the passport-local-mongoose and add it and its 
// methods to our user schema.
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User", userSchema);