const dotenv = require("dotenv");
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const cls = require('cls-hooked');
const namespace = cls.createNamespace('sequelize_default');

const { DataTypes, Sequelize }  = require("sequelize");
// Habilita transacoes auto gerenciadas (sem necessidade de passar o "transaction" nas trasacoes)
Sequelize.useCLS(namespace)

const { UsersModel } = require("./models");

const configConnection = {
    host:   process.env.DB_HOSTNAME,
    port:   process.env.DB_PORT,
    dialect: 'mysql',
    logging: console.log,//config.databases.logging,
    ssl: false
}

let DBConnection;
try {
    const {DB_DBNAME,DB_USERNAME,DB_PASSWORD,DB_HOSTNAME,DB_PORT} = process.env
    
    DBConnection = new Sequelize(DB_DBNAME,DB_USERNAME,DB_PASSWORD, configConnection);
} catch (error) {
    console.log(error)
    console.log(process.env)
}

const DBContext = {}

/// Models definition
DBContext.Users = UsersModel(DBConnection, DataTypes);

/// Models associations
DBContext.Users.associate(DBContext)

module.exports = {
    DBConnection,
    DBContext
}