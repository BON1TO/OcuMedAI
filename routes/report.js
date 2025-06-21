const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reports");
const { isLoggedIn, validateReport } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.get("/new", isLoggedIn, reportController.renderNewReportForm);

router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  validateReport,
  wrapAsync(reportController.submitReport)  // ✅ must match
);

router.get("/:id", isLoggedIn, wrapAsync(reportController.showReport));
router.get("/", isLoggedIn, wrapAsync(reportController.listReports));

module.exports = router;
