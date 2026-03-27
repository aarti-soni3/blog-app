const { DataTypes } = require('sequelize')
const { getSequelize } = require('../config/db')
const User = require('./UserSchema');

const sequelize = getSequelize();

const Blog = sequelize.define(
    'Blog',
    {
        blog_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        // thumbnail: {
        //     type: DataTypes.BLOB,
        //     allowNull: false,
        // },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 20],
                    msg: 'Title should be between 2 to 20 character'
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
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
)

User.hasMany(Blog, {
    foreignKey: 'user_id'
});
Blog.belongsTo(User, {
    foreignKey: 'user_id',
    allowNull: false,
    type: DataTypes.UUID,
});

(async () => {
    await sequelize.sync({ force: false }).then(() => {
        console.log('database & table created !');
    }).catch((err) => {
        console.log('can not create db & table', err)
    })
})();

module.exports = Blog