const { Sequelize } = require('sequelize')

const connectMySQLDatabase = async () => {
    const sequelize = new Sequelize('blog_app', 'aarti', 'aarti@123', {
        host: 'localhost',
        dialect: 'mysql'
    });

    try {
        await sequelize.authenticate();
        console.log('Connection established successfully!');
    } catch (error) {
        console.error('Unable to connect database:', error);
    }
}

module.exports = connectMySQLDatabase;