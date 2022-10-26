const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const { models } = require('../libs/sequelize')

class UsersService {
    constructor() {}

    async find() {
        const rta = await models.User.findAll({
            include: ['person'],
        })
        if (!rta) {
            throw boom.notFound('user not found')
        }
        return rta
    }

    async create(user) {
        const hash = await bcrypt.hash(user.password, 10)
        const newUser = await models.User.create({
            ...user,
            password: hash,
        })
        delete newUser.dataValues.password
        return newUser
    }

    async findOne(id) {
        const user = await models.User.findByPk(id)
        if (!user) {
            throw boom.notFound('user not found')
        }
        return user
    }

    async findByEmail(email) {
        const rta = await models.User.findOne({
            where: { email },
        })
        return rta
    }

    async update(id, changes) {
        const user = await this.findOne(id)
        const rta = await user.update(changes)
        return rta
    }

    async delete(id) {
        const user = await this.findOne(id)
        await user.destroy()
        return { id }
    }
}

module.exports = UsersService
