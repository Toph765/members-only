const db = require("../db/queries");
const { format } = require("date-fns");

async function getHomePage(req, res) {
    const messages = await db.getMessages();

    res.render("homepage", {
        user: req.user,
        messages: messages,
    });
};

function getNewMessage(req, res) {
    res.render("newMessage");
}

async function postNewMessage(req, res) {
    const { message } = req.body;
    const { user_id } = req.user;
    const timestamp = format(new Date(), "PP',' p");

    const messageDetails = {
        message: message,
        timestamp: timestamp,
        userId: user_id,
    }

    await db.addNewMessage(messageDetails);

    res.redirect("/home");
}

function getMembership(req, res) {
    res.render("membership");
};

async function postMembership(req, res) {
    const { secretCode } = req.body;
    const message = "Wrong secret code. Please try again."

    if (secretCode !== "CatsAreAwesome4evah!!!") {
        res.render("membership", { message: message });
    } else {
        await db.updateMembership(req.user.user_id);
        res.redirect("/home");
    }
}

module.exports = {
    getHomePage,
    getNewMessage,
    postNewMessage,
    getMembership,
    postMembership,
}