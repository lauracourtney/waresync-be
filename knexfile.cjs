require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USERNAME || "waresync_user",
      password: process.env.DB_PASSWORD || "waresyncpassword",
      database: process.env.DB_DATABASE || "waresync_backend_db",
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
