const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const checkupController = require("../controllers/checkup");

router.get("/", isLoggedIn, checkupController.renderCheckup);

module.exports = router;
