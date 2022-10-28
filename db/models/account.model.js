const { Model, DataTypes, Sequelize } = require('sequelize')

const { USER_TABLE } = require('./user.model.js')

const ACCOUNT_TABLE = 'accounts'

const AcountSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    account: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    signe: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    typeAccount: {
        field: 'type_account',
        type: DataTypes.STRING,
    },
    typeState: {
        field: 'type_state',
        type: DataTypes.STRING,
    },
    total: {
        type: DataTypes.DECIMAL,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
    },
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        References: {
            model: USER_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
}

class Account extends Model {
    static associate(models) {
        this.belongsTo(models.User, {
            as: 'user',
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ACCOUNT_TABLE,
            modelName: 'Account',
            timestamps: false,
        }
    }
}

module.exports = { ACCOUNT_TABLE, AcountSchema, Account }
