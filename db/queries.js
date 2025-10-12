const pool = require("./pool");

async function addNewUser(userDetails) {
    await pool.query(`
        INSERT INTO users (firstname, lastname, username, password, is_admin, is_member)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [
            userDetails.firstName,
            userDetails.lastName,
            userDetails.username,
            userDetails.password,
            userDetails.isAdmin,
            userDetails.isMember
        ]);
}

async function getMessages() {
    const { rows } = await pool.query(`
        SELECT * FROM messages
    `)

    return rows;
}

async function addNewMessage(messageDetails) {
    await pool.query(`
        INSERT INTO messages (message, timestamp, user_id)
        VALUES ($1, $2, $3)`,
        [
            messageDetails.message,
            messageDetails.timestamp,
            messageDetails.userId
        ]);
}

module.exports = {
    addNewUser,
    getMessages,
    addNewMessage,
}