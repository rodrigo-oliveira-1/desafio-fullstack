const dotenv = require("dotenv");
//if (process.env.NODE_ENV === 'production') {
  //dotenv.config({ path: `/home/node/app/.env.${process.env.NODE_ENV}` })  
  //console.log(process.env)
//} else {
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
//}

const {DB_DBNAME,DB_USERNAME,DB_PASSWORD,DB_HOSTNAME,DB_PORT} = process.env
    

module.exports = {
  development: {
    username: DB_USERNAME,
    password: `${DB_PASSWORD}`,
    database: DB_DBNAME,
    host: DB_HOSTNAME,
    port: DB_PORT,
    dialect: "mysql",
  },
  test: {
    username: DB_USERNAME,
    password: `${DB_PASSWORD}`,
    database: DB_DBNAME,
    host: DB_HOSTNAME,
    port: DB_PORT,
    dialect: "mysql",
  },
  staging: {
    username: DB_USERNAME,
    password: `${DB_PASSWORD}`,
    database: DB_DBNAME,
    host: DB_HOSTNAME,
    port: DB_PORT,
    dialect: "mysql",
  },
  production: {
    username: DB_USERNAME,
    password: `${DB_PASSWORD}`,
    database: DB_DBNAME,
    host: DB_HOSTNAME,
    port: DB_PORT,
    dialect: "mysql",
  },
};
