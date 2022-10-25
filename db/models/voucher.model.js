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
    state_initial: {
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
        this.hasMany(models.DetailVoucher, {
            as: 'detailvouchers',
            foreignKey: 'detailVoucherId',
        })
        this.hasMany(models.Daybook, {
            as: 'daybooks',
            foreignKey: 'daybookId',
        })
        this.hasMany(models.PaymentVoucher, {
            as: 'paymentvouchers',
            foreignKey: 'paymentVoucherId',
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
