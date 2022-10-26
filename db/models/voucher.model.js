const { Model, DataTypes, Sequelize } = require('sequelize')

const VOUCHER_TABLE = 'vouchers'

const VoucherSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    typeVoucher: {
        field: 'type_voucher',
        allowNull: false,
        type: DataTypes.STRING,
    },
    stateInitial: {
        field: 'state_initial',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    },
    date: {
        allowNull: true,
        type: DataTypes.DATE,
    },
    beneficiary: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    dniRuc: {
        field: 'dni_ruc',
        allowNull: true,
        type: DataTypes.STRING,
    },
    sum: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    concept: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    bank: {
        allowNull: false,
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
}

class Voucher extends Model {
    static associate(models) {
        this.belongsToMany(models.Account, {
            as: 'items_accounts',
            through: models.VoucherAccount,
            foreignKey: 'voucherId',
            otherKey: 'accountId',
        })
        this.belongsToMany(models.Payment, {
            as: 'items_payments',
            through: models.PaymentVoucher,
            foreignKey: 'voucherId',
            otherKey: 'paymentId',
        })
        this.hasOne(models.Daybook, {
            as: 'daybooks',
            foreignKey: 'voucherId',
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: VOUCHER_TABLE,
            modelName: 'Voucher',
            timestamps: false,
        }
    }
}

module.exports = { VOUCHER_TABLE, VoucherSchema, Voucher }
