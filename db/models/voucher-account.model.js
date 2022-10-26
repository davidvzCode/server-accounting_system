const { Model, DataTypes, Sequelize } = require('sequelize')

const { ACCOUNT_TABLE } = require('./account.model')
const { VOUCHER_TABLE } = require('./voucher.model')

const VOUCHER_ACCOUNT_TABLE = 'vouchers_accounts'

const VoucherAccountSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    typeAccount: {
        field: 'type_account',
        allowNull: false,
        type: DataTypes.STRING,
    },
    value: {
        allowNull: false,
        type: DataTypes.DOUBLE,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
    },
    accountId: {
        field: 'account_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        References: {
            model: ACCOUNT_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    voucherId: {
        field: 'voucher_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        References: {
            model: VOUCHER_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
}

class Voucher_Account extends Model {
    static associate(models) {}

    static config(sequelize) {
        return {
            sequelize,
            tableName: VOUCHER_ACCOUNT_TABLE,
            modelName: 'VoucherAccount',
            timestamps: false,
        }
    }
}

module.exports = {
    VOUCHER_ACCOUNT_TABLE,
    VoucherAccountSchema,
    Voucher_Account,
}
