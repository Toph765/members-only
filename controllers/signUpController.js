const db = require("../db/queries");
const bcrypt = require("bcryptjs");

const getsignUp = (req, res) => {
    res.render("signUp");
};

const postSignUp = async (req, res, next) => {
    const hashedPword = await bcrypt.hash(req.body.password, 10); 

    const userDetail = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hashedPword,
        isAdmin: req.body.isAdmin ? true : false,
        isMember: false
    }

    console.log('detail: ', userDetail);
    await db.addNewUser(userDetail);

    res.redirect("/");
};

module.exports = {
    getsignUp,
    postSignUp
}