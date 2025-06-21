const User = require("../models/user");
const Report = require("../models/report");

module.exports.renderDashboard = async (req, res) => {
    const user = await User.findById(req.user._id).populate("reports");
    res.render("users/dashboard", { user });
};

module.exports.showUserDetails = async (req, res) => {
    const user = await User.findById(req.user._id);
    res.render("users/user_details", { user });
};
