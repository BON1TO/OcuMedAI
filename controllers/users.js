const User = require("../models/user");
const Report = require("../models/report");

module.exports.renderDashboard = async (req, res) => {
    // Fetch the most recent report for this user
    const latest = await Report.findOne({ user: req.user._id })
        .sort({ createdAt: -1 }) // newest first
        .lean();

    // Send ONLY latest, dashboard doesn’t need full user object
    res.render("users/dashboard", { latest });

    let healthState = "default";

if (latest) {
    const dr = latest.diabeticRetinopathyLevel?.toLowerCase() || "";
    const hyper = latest.hypertensionRisk || 0;
    const athero = latest.atherosclerosisRisk || 0;
    const hba1c = latest.hba1cLevel || 0;

    if (
        dr.includes("severe") ||
        dr.includes("proliferative") ||
        hyper > 70 ||
        athero > 70 ||
        hba1c > 7
    ) {
        healthState = "danger";
    }
    else if (
        dr.includes("moderate") ||
        hyper > 40 ||
        athero > 40 ||
        (hba1c >= 6 && hba1c <= 7)
    ) {
        healthState = "warning";
    }
    else {
        healthState = "healthy";
    }
}

res.render("users/dashboard", { user, latest, healthState });

};

module.exports.showUserDetails = async (req, res) => {
    const user = await User.findById(req.user._id).lean();
    res.render("users/user_details", { user });
};
