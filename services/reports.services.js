const boom = require('@hapi/boom')

const { models } = require('../libs/sequelize')
const { Op } = require('sequelize')

class ReportsService {
    async journal(query) {
        const options = {
            order: [['journal', 'nfolio']],
            include: ['items_accounts', 'items_payments', 'journal'],
            where: {},
        }
        const { date, nfolio } = query
        const rta = await models.Voucher.findAll(options)
        if (!rta) {
            throw boom.notFound('Journal not found')
        }
        return rta
    }

    async mayores(query) {
        const rta = await models.Voucher.findAll({
            order: [['items_accounts', 'account']],
            include: ['items_accounts', 'journal'],
        })
        if (!rta) {
            throw boom.notFound('Journal not found')
        }
        return rta
    }

    async findbyNfolio() {
        const journal = await models.Journal.max('nfolio')
        if (!journal) {
            return 0
        }
        return journal
    }
}

module.exports = ReportsService
