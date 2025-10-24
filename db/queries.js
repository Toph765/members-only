const pool = require("./pool");

async function addNewUser(userDetails) {
    const user = await pool.query(`
        INSERT INTO users (firstname, lastname, username, password, is_admin, is_member)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id`,
        [
            userDetails.firstName,
            userDetails.lastName,
            userDetails.username,
            userDetails.password,
            userDetails.isAdmin,
            userDetails.isMember
        ]);

    return user.rows[0].user_id;
}

async function getUserById(id) {
    const { rows } = await pool.query(`
        SELECT * FROM users WHERE user_id = $1
    `, [id]);

    return rows[0];
}

async function getMessages() {
    const { rows } = await pool.query(`
        SELECT 
            message_id, 
            message, 
            timestamp, 
            users.username 
        FROM messages
        LEFT JOIN users ON messages.user_id = users.user_id
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

async function updateMembership(id) {
    await pool.query(`
        UPDATE users SET is_member = $1
        WHERE user_id = $2
    `, [
        true,
        id
    ]);
};

async function deleteMessage(id) {
    await pool.query(`
        DELETE FROM messages WHERE message_id = $1
    `, [id]);
}

async function isUnameAvailable(username) {
    const { rows } = await pool.query(`
        SELECT * FROM users WHERE username = $1
    `, [username]);

    return rows.length > 0 ? false : true;
}

module.exports = {
    addNewUser,
    getUserById,
    getMessages,
    addNewMessage,
    updateMembership,
    deleteMessage,
    isUnameAvailable
}