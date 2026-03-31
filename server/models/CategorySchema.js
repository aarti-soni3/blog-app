const DataTypes = require('sequelize');
const { getSequelize } = require('../config/db');

const sequelize = getSequelize();
const Category = sequelize.define(
    'Category',
    {
        categoryId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        }
    },
    {
        underscored: true
    }
)

// const create = async () => {
//     await sequelize.sync({ force: false }).then(() => {
//         console.log('database & table created !');
//     }).catch((err) => {
//         console.log('can not create db & table', err)
//     })
// }

// create();

module.exports = Category;
