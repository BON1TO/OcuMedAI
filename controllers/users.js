const User = require("../models/user");
const Report = require("../models/report");

module.exports.renderDashboard = async (req, res) => {
    try {
        if (!req.user) {
            return res.redirect("/login");
        }

        // Fetch MOST RECENT report
        const latest = await Report.findOne({ user: req.user._id })
            .sort({ createdAt: -1 })
            .lean();

        // Default state
        let healthState = "default";

        if (latest) {
            const dr = latest.diabeticRetinopathyLevel?.toLowerCase() || "";
            const hyper = latest.hypertensionRisk || 0;
            const athero = latest.atherosclerosisRisk || 0;
            const hba1c = latest.hba1cLevel || 0;

            if (
                dr.includes("severe") ||
                dr.includes("proliferate") ||
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

        // SEND SAFE VALUES TO DASHBOARD
        return res.render("users/dashboard", {
            user: req.user,   // minimal user (safe, exists)
            latest,
            healthState,
            pageTitle: "Dashboard"
        });

    } catch (err) {
        console.error("Dashboard Error:", err);
        req.flash("error", "Unable to load dashboard");
        return res.redirect("/home");
    }
};


module.exports.showUserDetails = async (req, res) => {
    const user = await User.findById(req.user._id).lean();
    res.render("users/user_details", { user });
};
