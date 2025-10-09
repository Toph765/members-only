function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.render("index", { message: "Incorrect username or password" });
    }
}

module.exports = {
    isAuth
}