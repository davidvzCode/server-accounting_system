const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')
const { Op, Sequelize } = require('sequelize')

class AccountService {
    async find(query) {
        const options = {
            where: {},
            order: [],
        }
        const { search, limit, offset, orderBy, order } = query

        if (limit && offset) {
            options.limit = limit
            options.offset = offset
        }
        if (order && orderBy) {
            options.order.push([orderBy, order])
        }
        if (search) {
            options.where = {
                [Op.or]: [
                    Sequelize.where(
                        Sequelize.fn('lower', Sequelize.col('description')),
                        {
                            [Op.like]: `%${search}%`,
                        }
                    ),
                    {
                        account: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                ],
            }
        }

        const rta = await models.Account.findAndCountAll(options)

        if (!rta) {
            throw boom.notFound('account not found')
        }
        return rta
    }

    async autocomplete(search) {
        const options = {
            where: {},
        }
        if (search) {
            options.where = {
                [Op.or]: [
                    Sequelize.where(
                        Sequelize.fn('lower', Sequelize.col('description')),
                        {
                            [Op.like]: `%${search}%`,
                        }
                    ),
                    {
                        account: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                ],
            }
        }

        const account = await models.Account.findAll(options)

        if (!account) {
            throw boom.notFound('account not found')
        }
        return account
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
