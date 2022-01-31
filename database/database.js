const Sequelize = require("sequelize");

const connection = new Sequelize('ubtlogistica5','ubtlogistica5','Nma55171',{
    host: 'mysql.db4.net2.com.br',
    dialect: 'mysql'
});

module.exports = connection;