const boom = require('@hapi/boom')
const sequelize = require('../libs/sequelize')

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

    async addItem(data) {
        const t = await sequelize.transaction()
        try {
            const newItem = await models.PaymentVoucher.bulkCreate(data, {
                transaction: t,
            })
            return newItem
        } catch (error) {
            await t.rollback()
            throw boom.notFound('Error')
        }
    }

    async updatePV(id, changes) {
        const payment_voucher = await models.PaymentVoucher.findByPk(id)
        if (!payment_voucher) {
            throw boom.notFound('Payment-Voucher not found')
        }
        const rta = await payment_voucher.update(changes)
        return rta
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

    async deleteAllDetail(id) {
        const t = await sequelize.transaction()
        try {
            await models.PaymentVoucher.destroy({
                where: {
                    voucherId: id,
                },
            })
            await t.commit()
            return 'All register deleted'
        } catch (error) {
            await t.rollback()
            throw boom.notFound('Error')
        }
    }
}

module.exports = PaymentService
