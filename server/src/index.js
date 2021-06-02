const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const MySQLStore = require("express-mysql-session")(session);

//PERSONAL MODULES:
const { dbCredentials } = require("./dbCredentials");

// STATEMENTS
const app = express();

// MIDDfrom
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "asdf33g4w4hghjkuil8saef345",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(dbCredentials),
  })
);
app.use(cookieParser("asdf33g4w4hghjkuil8saef345"));
app.use(passport.initialize());
app.use(passport.session());
require("./lib/passport");

//GLOBAL VARIABLES:
app.use((req, res, next) => {
  app.locals.user = req.user;
  next();
});

// ROUTES

// GET

//POST

// AUTH ROUTES
const authRoutes = require("./querys/authRequest");
const registerRoutes = require("./querys/registerRoutes");
const lastUserRoutes = require("./querys/lastUserRoutes");
const modifyUsers = require("./querys/modifyUsers");
const history_routes = require("./querys/history");

// GET APP.USE

// POST APP.USE

// AUTH ROUTES APP.USE
app.use(authRoutes);
app.use(registerRoutes);
app.use(lastUserRoutes);
app.use(modifyUsers);
app.use(history_routes);

// PORT STATEMENT
app.listen(52000, () => {
  console.log("Running on port 52000");
});
