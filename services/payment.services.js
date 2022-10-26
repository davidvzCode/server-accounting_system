const boom = require('@hapi/boom')

const { models } = require('../libs/sequelize')

class PaymentService {
    async find() {
        const rta = await models.Payment.findAll()
        if (!rta) {
            throw boom.notFound('Payment not found')
        }
        return rta
    }

    async create(payment) {
        const newPayment = await models.Payment.create(payment)
        return newPayment
    }

    async findOne(id) {
        const payment = await models.Payment.findByPk(id)
        if (!payment) {
            throw boom.notFound('Payment not found')
        }
        return payment
    }

    async update(id, changes) {
        const payment = await this.findOne(id)
        const rta = await payment.update(changes)
        return rta
    }

    async delete(id) {
        const payment = await this.findOne(id)
        await payment.destroy()
        return { id }
    }
}

module.exports = PaymentService
