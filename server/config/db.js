const { Sequelize } = require('sequelize')

const db_name = process.env.DB_NAME || 'blog_app'
const db_username = process.env.DB_USERNAME || 'aarti'
const db_password = process.env.DB_PASSWORD || 'aarti@123'
const db_hostname = process.env.DB_HOSTNAME || 'localhost'

//connet sequelize database
const getSequelize = () => {
    return new Sequelize(db_name, db_username, db_password, {
        host: db_hostname,
        dialect: 'mysql'
    });
}

const connectMySQLDatabase = async () => {
    const sequelize = getSequelize();

    try {
        await sequelize.authenticate();
        console.log('Connection established successfully!');
    } catch (error) {
        console.error('Unable to connect database:', error);
    }
}

// const create = async () => {
//     await sequelize.sync({ force:false }).then(() => {
//         console.log('database & table created !');
//     }).catch((err) => {
//         console.log('can not create db & table', err)
//     })
// }

// create();

module.exports = { connectMySQLDatabase, getSequelize };