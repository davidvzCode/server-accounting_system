const boom = require('@hapi/boom')

const { models } = require('../libs/sequelize')

class AccountService {
    async find() {
        const rta = await models.Account.findAll()
        if (!rta) {
            throw boom.notFound('account not found')
        }
        return rta
    }

    async create(account) {
        const newAccount = await models.Account.create(account)
        return newAccount
    }

    async findOne(id) {
        const account = await models.Account.findByPk(id)
        if (!account) {
            throw boom.notFound('account not found')
        }
        return account
    }

    async update(id, changes) {
        const account = await this.findOne(id)
        const rta = await account.update(changes)
        return rta
    }

    async delete(id) {
        const account = await this.findOne(id)
        await account.destroy()
        return { id }
    }
}

module.exports = AccountService
