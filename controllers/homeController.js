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
module.exports = {
    getHomePage,
    getNewMessage,
    postNewMessage
}