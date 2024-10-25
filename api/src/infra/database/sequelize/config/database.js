const dotenv = require("dotenv");
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

console.log(process.env)

const {DB_DBNAME,DB_USERNAME,DB_PASSWORD,DB_HOSTNAME,DB_PORT} = process.env
    console.log(`pg://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/${DB_DBNAME}`)

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: `${process.env.DB_PASSWORD}`,
    database: process.env.DB_DBNAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: `${process.env.DB_PASSWORD}`,
    database: process.env.DB_DBNAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
  staging: {
    username: process.env.DB_USERNAME,
    password: `${process.env.DB_PASSWORD}`,
    database: process.env.DB_DBNAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: `${process.env.DB_PASSWORD}`,
    database: process.env.DB_DBNAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
};
