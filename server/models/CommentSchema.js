const DataTypes = require('sequelize');
const { getSequelize } = require('../config/db');
const Blog = require('./BlogSchema');
const User = require('./UserSchema');

const sequelize = getSequelize();

const Comment = sequelize.define(
    'Comment',
    {
        commentId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            field: 'user_id',
            type: DataTypes.UUID,
        },
        blogId: {
            field: 'blog_id',
            type: DataTypes.UUID,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 60],
                    msg: 'comment must be between 2 to 60 characters! '
                }
            },
        },
    },
    {
        underscored: true
    }
)

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'cascade',
    hooks: true,
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks: true,    
})

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
    type: DataTypes.UUID,
    allowNull: false,
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    type: DataTypes.UUID,
    allowNull: false,
})

module.exports = Comment;