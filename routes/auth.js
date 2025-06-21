const express = require('express');
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const {validateRegister} = require('../middleware');
const wrapAsync = require('../utils/wrapAsync');
const authController = require("../controllers/auths.js");

// SIGNUP ---------------------------------------
router.route("/register")
    .get(authController.renderRegisterForm)
    .post(validateRegister, wrapAsync(authController.registerNewUser))

// LOGIN ----------------------------------------
router.route("/login")
    .get(authController.renderLoginForm)
    .post(passport.authenticate("local",{
        failureFlash : true,
        failureRedirect : "/login"
    }), authController.loginUser);

// LOGOUT ---------------------------------------
router.route("/logout")
    .get(authController.logoutUser)

module.exports = router;