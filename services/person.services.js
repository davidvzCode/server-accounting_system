const boom = require('@hapi/boom')

const { models } = require('../libs/sequelize')

class PersonService {
    async find() {
        const rta = await models.Person.findAll()
        if (!rta) {
            throw boom.notFound('person not found')
        }
        return rta
    }

    async create(person) {
        const newPerson = await models.Person.create(person)
        return newPerson
    }

    async findOne(id) {
        const person = await models.Person.findByPk(id)
        if (!person) {
            throw boom.notFound('person not found')
        }
        return person
    }

    async update(id, changes) {
        const person = await this.findOne(id)
        const rta = await person.update(changes)
        return rta
    }

    async delete(id) {
        const person = await this.findOne(id)
        await person.destroy()
        return { id }
    }
}

module.exports = PersonService
