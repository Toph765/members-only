const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        firstname VARCHAR (255),
        lastname VARCHAR (255),
        username VARCHAR (255),
        password VARCHAR (255),
        is_admin BOOLEAN,
        is_member BOOLEAN
    );

    CREATE TABLE IF NOT EXISTS messages (
        message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        message VARCHAR (255),
        timestamp VARCHAR (255),
        user_id INTEGER
    );
`
async function main() {
    console.log("seeding");
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("done");
};

main();