const { Model, DataTypes, Sequelize } = require('sequelize')
var moment = require('moment')
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
        get() {
            return moment(this.getDataValue('date')).format('YYYY-MM-DD')
        },
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
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
    },
    mes: {
        type: DataTypes.VIRTUAL,
        get() {
            const newDate = new Date(this.date)
            return newDate.getMonth()
        },
    },
    total: {
        type: DataTypes.VIRTUAL,
        get() {
            if (this.items_accounts) {
                if (this.items_accounts.length > 0) {
                    return this.items_accounts.reduce((total, item) => {
                        return total + item.VoucherAccount.value
                    }, 0)
                }
            }
            return 0
        },
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
        this.hasOne(models.Journal, {
            as: 'journal',
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
