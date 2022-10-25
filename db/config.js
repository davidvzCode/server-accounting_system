const { config } = require('../config/config')
module.exports = {
    development: {
        //url: URI,
        url: config.dbUrl,
        //POSTGRES
        dialect: 'postgres',
        //Mysql
        //dialect: 'mysql',
    },
    production: {
        //url: URI,
        url: config.dbUrl,
        //POSTGRES
        dialect: 'postgres',
        //Mysql
        //dialect: 'mysql',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
    },
}
