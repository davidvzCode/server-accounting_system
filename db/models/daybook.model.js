const { Model, DataTypes, Sequelize } = require('sequelize')

const { VOUCHER_TABLE } = require('./voucher.model')
const DAYBOOK_TABLE = 'daybooks'

const DaybookSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    nfolio: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
}

class Daybook extends Model {
    static associate(models) {
        this.belongsTo(models.Voucher, {
            as: 'voucher',
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: DAYBOOK_TABLE,
            modelName: 'Daybook',
            timestamps: false,
        }
    }
}

module.exports = { DAYBOOK_TABLE, DaybookSchema, Daybook }
