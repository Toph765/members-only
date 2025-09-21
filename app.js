const express = require('express');
const app = express();
const path = require('node:path');
const assetsPath = path.join(__dirname, 'public');
const pool = require("./db/pool");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
require("dotenv").config();
require("./lib/passport");

const sessionStore = new pgSession({ pool });

app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));