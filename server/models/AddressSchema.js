const { DataTypes } = require("sequelize");
const { getSequelize } = require("../config/db");

const sequelize = getSequelize();

const Address = sequelize.define(
    'Address',
    {
        addressId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            field: 'user_id'
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: `Street can't be empty!`
                }
            }
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'City can not be empty!'
                }, isAlpha: {
                    msg: 'City field must be alphabets!'
                }
            }
        },
        state: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'State can not be empty!'
                }, isAlpha: {
                    msg: 'State field must be alphabets!'
                }
            }
        },
        zip: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                isNumeric: true,
                len: {
                    args: [6, 6],
                    msg: 'Postal code length must be digits'
                }
            }
        }
    },
    {
        //allow user_id as userId in front n backend
        underscored: true,
    }
)

module.exports = Address