const { DataTypes } = require('sequelize')
const { getSequelize } = require('../config/db')
const User = require('./UserSchema');
const Category = require('./CategorySchema');

const sequelize = getSequelize();

const Blog = sequelize.define(
    'Blog',
    {
        userId: {
            type: DataTypes.UUID,
            field: 'user_id'
        },
        categoryId: {
            type: DataTypes.UUID,
            field: 'category_id'
        },
        blogId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 40],
                    msg: 'Title should be between 2 to 40 character'
                },
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                min: {
                    args: 10,
                    msg: 'description must be more than 10 charater long'
                },
            }
        },
    },
    {
        underscored: true
    }
)

User.hasMany(Blog, {
    foreignKey: 'user_id',
});

Category.hasMany(Blog, {
    foreignKey: 'category_id'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id',
    allowNull: false,
    type: DataTypes.UUID,
});

Blog.belongsTo(Category, {
    foreignKey: 'category_id',
    allowNull: true,
    type: DataTypes.UUID
})

// const create = async () => {
//     await sequelize.sync({ force: false }).then(() => {
//         console.log('database & table created !');
//     }).catch((err) => {
//         console.log('can not create db & table', err)
//     })
// }

// create();

module.exports = Blog