const { DataTypes } = require('sequelize')
const { getSequelize } = require('../config/db')
const { hashedPassword } = require('../utils/hashedPasswordUtility');
const Address = require('./AddressSchema');

const sequelize = getSequelize()

const User = sequelize.define(
    'User',
    {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            field: 'user_id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter your name!'
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter username!'
                }
            }
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: 'Must be only number'
                },
                len: [10]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Must be valid email address'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8, 255],
                    msg: 'Password must be at least 8 characters long'
                },
                isComplex(value) {
                    if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/\d/.test(value))
                        throw new Error('Password must contain lowercase, uppercase & numbers!');
                }
            }
        },
    }, {
    underscored: true,
    defaultScope: {
        attributes: { exclude: ['password'] }
    },
    scopes: {
        withPassword: { attributes: {} }
    }
})

//delete address info if user delete
User.hasMany(Address, {
    onDelete: 'cascade',
    hooks: true,
    foreignKey: 'user_id',
});

Address.belongsTo(User, {
    foreignKey: 'user_id',
    allowNull: false,
    type: DataTypes.UUID
});

//hash the password before store
User.beforeCreate(async (user, options) => {
    user.password = await hashedPassword(user.password)
});

module.exports = User