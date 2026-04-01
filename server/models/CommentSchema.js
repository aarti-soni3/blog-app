const DataTypes = require('sequelize');
const { getSequelize } = require('../config/db');

const sequelize = getSequelize();

const Comment = sequelize.define(
    'Comment',
    {
        commentId: {

        },
        blogId: {

        },
        userId: {

        },
    },
    {
        underscored: true
    }
)