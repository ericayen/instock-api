require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

module.exports = {
  client: "mysql2",
  connection: {
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    charset: "utf8",
  },
};
