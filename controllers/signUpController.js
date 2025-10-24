const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult, matchedData } = require("express-validator");
const passport = require("passport");

const alphaErr = "must only contain letters"

const validateUser = [
    body("firstName").trim()
        .isAlpha().withMessage(`First name ${alphaErr}`),
    body("lastName").trim()
        .isAlpha().withMessage(`Last name ${alphaErr}`),
    body("username").trim()
        .isLength({ min: 1, max: 28 }).withMessage("Username must be between 1 and 28 characters")
        .custom(async (username) => {
            const isValid = await db.isUnameAvailable(username);
            
            if (!isValid) {
                throw new Error("Username already exists")
            }
        }),
    body("password").trim()
        .isLength({ min: 3 }).withMessage("Password must have at least 3 characters"),
    body("rePassword").trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password does not match")
            };

            return true;
        })
];


const getsignUp = (req, res) => {
    res.render("signUp");
};

const postSignUp = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render("signUp", { errors: errors.array() })
        }

        const { firstName, lastName, username, password } = matchedData(req);
        const hashedPword = await bcrypt.hash(password, 10);
        const userDetail = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: hashedPword,
            isAdmin: req.body.isAdmin ? true : false,
            isMember: false
        };

        const userId = await db.addNewUser(userDetail);
        const user = await db.getUserById(userId);

        req.login(user, (err) => {
            if (err) { return next(err) };
            return res.redirect("/home");
        });
    }
]

module.exports = {
    getsignUp,
    postSignUp
}