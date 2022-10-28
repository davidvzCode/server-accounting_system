const { Model, DataTypes, Sequelize } = require('sequelize')

const { PAYMENT_TABLE } = require('./payment.model')
const { VOUCHER_TABLE } = require('./voucher.model')

const PAYMENT_VOUCHER_TABLE = 'payment_vouchers'

const PaymentVoucherSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.STRING,
    },
    total: {
        allowNull: false,
        type: DataTypes.DECIMAL,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
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
    paymentId: {
        field: 'payment_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        References: {
            model: PAYMENT_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
}

class PaymentVoucher extends Model {
    static associate(models) {}

    static config(sequelize) {
        return {
            sequelize,
            tableName: PAYMENT_VOUCHER_TABLE,
            modelName: 'PaymentVoucher',
            timestamps: false,
        }
    }
}

module.exports = { PAYMENT_VOUCHER_TABLE, PaymentVoucherSchema, PaymentVoucher }
