const Sequelize = require("sequelize");

// const pool = mysql.createPool({
//     host: '192.168.135.129',
//     user: 'nodejsuser',
//     database: 'node-complete',
//     password: "P@ssw0rd"
// });
const sequelize = new Sequelize("node-complete", "nodejsuser", "P@ssw0rd", {
  dialect: "mysql",
  host: "192.168.135.135",
});
module.exports = sequelize;
