const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

// View own profile (Dashboard)
router.get("/dashboard", isLoggedIn, wrapAsync(userController.renderDashboard));

// View full user details
router.get("/details", isLoggedIn, wrapAsync(userController.showUserDetails));

module.exports = router;
