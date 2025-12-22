const { registerSchema, reportSchema } = require("./schema.js");

/* =========================
   REGISTER VALIDATION
   ========================= */
module.exports.validateRegister = (req, res, next) => {
  // allow missing optional fields safely
  const { error } = registerSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true   // 🔑 prevents silent rejection
  });

  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    req.flash("error", msg);
    return res.redirect("/register");
  }

  next();
};

/* =========================
   REPORT VALIDATION
   ========================= */
module.exports.validateReport = (req, res, next) => {
  const { error } = reportSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    req.flash("error", msg);
    return res.redirect("/reports/new");
  }

  next();
};

/* =========================
   AUTH CHECK
   ========================= */
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be logged in first!");
    return res.redirect("/login");
  }
  next();
};
