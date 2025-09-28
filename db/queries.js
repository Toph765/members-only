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

module.exports = {
    addNewUser
}