const passport = require("passport");

function getLogIn(req, res) {
    res.render("index")
};

const postLogIn = passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/home",
});


function getLogOut(req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        res.redirect("/");
    })
};

module.exports = {
    getLogIn,
    postLogIn,
    getLogOut,
}