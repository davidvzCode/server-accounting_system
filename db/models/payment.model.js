const { Model, DataTypes, Sequelize } = require('sequelize')

const PAYMENT_TABLE = 'payment'

const PaymentSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
    },
}

class Payment extends Model {
    static associate(models) {}

    static config(sequelize) {
        return {
            sequelize,
            tableName: PAYMENT_TABLE,
            modelName: 'Payment',
            timestamps: false,
        }
    }
}

module.exports = { PAYMENT_TABLE, PaymentSchema, Payment }
