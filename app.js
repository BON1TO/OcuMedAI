require("dotenv").config({ path: __dirname + "/.env" });
console.log("Loaded MONGO_URL:", process.env.MONGO_URL);

// ---------------------------------------------- Express + Mongoose
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// ---------------------------------------------- EJS + Path
const path = require('path');
const engine = require('ejs-mate');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ---------------------------------------------- Middlewares
const methodOverride = require('method-override');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ---------------------------------------------- Models
const User = require('./models/user');

// ---------------------------------------------- Routers
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const reportRoutes = require('./routes/report');

// ---------------------------------------------- Static Files
app.use(express.static(path.join(__dirname, 'public')));

// ---------------------------------------------- Session + Flash
const session = require('express-session');
const flash = require('connect-flash');

app.use(
    session({
        secret: process.env.SECRET || "keyboardcat",
        resave: false,
        saveUninitialized: true
    })
);

app.use(flash());

// ---------------------------------------------- Passport Config
const passport = require('passport');
const LocalStrategy = require('passport-local');

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ---------------------------------------------- GLOBAL LOCALS (Flash, User, Active Route)
app.use((req, res, next) => {
    res.locals.currentUser = req.user || null;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    // SIDEBAR HIGHLIGHT FIX — the MOST important part
    res.locals.currentPath = req.path || "";

    next();
});

// ---------------------------------------------- REQUEST LOGGER
app.use((req, res, next) => {
    console.log("REQUEST RECEIVED:", req.method, req.url);
    next();
});

// ---------------------------------------------- Routes
app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/reports", reportRoutes);

// Fix direct /dashboard access
app.get("/dashboard", (req, res) => res.redirect("/users/dashboard"));

// ---------------------------------------------- Home Routes
app.get("/", (req, res) => res.redirect("/home"));

app.get("/home", (req, res) => {
    res.render("home");
});

// ---------------------------------------------- Error Handlers
const ExpressError = require('./utils/ExpressError');

app.use((req, res, next) => {
    next(new ExpressError(`Page Not Found: ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    console.error("SERVER ERROR:", err);
    res.status(statusCode).render("error", { err });
});

// ---------------------------------------------- MongoDB Connection
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB:", mongoose.connection.name);
    console.log("Connected to host:", mongoose.connection.host);
}

main().catch(err => console.log("MongoDB connection error:", err));

// ---------------------------------------------- Start Server
app.listen(8111, () => {
    console.log("Server is listening on port 8111");
});
