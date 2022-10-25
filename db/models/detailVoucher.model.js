const { Model, DataTypes, Sequelize } = require('sequelize')

const { ACCOUNT_TABLE } = require('./account.model')
const { VOUCHER_TABLE } = require('./voucher.model')

const DETAILVOUCHER_TABLE = 'detailvouchers'

const DetailVoucherSchema = {
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

class DetailVoucher extends Model {
    static associate(models) {
        this.belongsTo(models.Account, {
            as: 'account',
        })
        this.belongsTo(models.Voucher, {
            as: 'voucher',
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: DETAILVOUCHER_TABLE,
            modelName: 'DetailVoucher',
            timestamps: false,
        }
    }
}

module.exports = { DETAILVOUCHER_TABLE, DetailVoucherSchema, DetailVoucher }
