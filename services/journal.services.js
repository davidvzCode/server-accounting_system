const boom = require('@hapi/boom')

const { models } = require('../libs/sequelize')

class JournalService {
    async find() {
        const rta = await models.Journal.findAll()
        if (!rta) {
            throw boom.notFound('dairybook not found')
        }
        return rta
    }

    async findOne(id) {
        const journal = await models.Journal.findByPk(id)
        if (!journal) {
            throw boom.notFound('Journal not found')
        }
        return journal
    }

    async findbyNfolio() {
        const journal = await models.Journal.max('nfolio')
        if (!journal) {
            return 0
        }
        return journal
    }
}

module.exports = JournalService
