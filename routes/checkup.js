const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const Report = require("../models/report");

router.get("/", isLoggedIn, async (req, res) => {
  const latestReport = await Report
    .findOne({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.render("checkup", { report: latestReport });
});

module.exports = router;
