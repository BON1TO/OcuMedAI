const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name : {
        type: String,
        required: true,
    },
    reports : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report'
    }]
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User",userSchema);
module.exports = User;