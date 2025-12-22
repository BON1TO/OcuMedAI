const User = require("../models/user.js");

module.exports.renderRegisterForm = (req, res) => {
    res.render("auth/register");
};

module.exports.registerNewUser = async (req, res, next) => {
    try {
        const { username, name, email, password } = req.body;
        const newUser = new User({ username, name, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to OcuMedAI!");
            res.redirect("/home");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("auth/login");
};

module.exports.loginUser = (req, res) => {
    const redirectUrl = req.session.returnTo || '/home';
    delete req.session.returnTo;
    req.flash("success", "Welcome back!");
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
    req.logout(() => {
        req.flash("success", "You have logged out!");
        res.redirect("/home");
    });
};
