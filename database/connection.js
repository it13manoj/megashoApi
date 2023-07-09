const mysql = require("mysql2");
const config = require("config");
const dbDetails = config.get("Customer.dbConfig");


const connection = mysql.createPool({
    host: dbDetails.host,
    user: dbDetails.user,
    password:dbDetails.password,
    database: dbDetails.database,
    port: dbDetails.port
});

connection.query(`SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));`);
module.exports = connection.promise();