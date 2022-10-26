const { Model, DataTypes, Sequelize } = require('sequelize')

const USER_TABLE = 'users'

const UserSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    recoveryToken: {
        field: 'recovery_token',
        allowNull: true,
        type: DataTypes.STRING,
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'user',
    },
    urlPerfil: {
        field: 'url_perfil',
        allowNull: true,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
    },
}

class User extends Model {
    static associate(models) {
        this.hasOne(models.Person, {
            as: 'person',
            foreignKey: 'userId',
        })
        this.hasMany(models.Account, {
            as: 'accounts',
            foreignKey: 'accountId',
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false,
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User }
