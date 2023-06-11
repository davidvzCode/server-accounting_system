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

    async addItem(id, data) {
        //const t = await sequelize.transaction()
        try {
            const paymentDetail = []
            for (const det of data) {
                const aux = {
                    ...det,
                    voucherId: id,
                }
                paymentDetail.push(aux)
            }
            const newItem = await models.PaymentVoucher.bulkCreate(
                paymentDetail
            )
            return newItem
        } catch (error) {
            //await t.rollback()
            throw boom.notFound('Error')
        }
    }

    async updatePV(id, changes) {
        const { paymentId } = changes
        const payment_voucher = await models.PaymentVoucher.findOne({
            where: {
                voucherId: id,
                paymentId,
            },
        })
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

    async findOnePV(id, paymentId) {
        const paymentVoucher = await models.PaymentVoucher.findOne({
            where: {
                voucherId: id,
                paymentId,
            },
        })
        if (!paymentVoucher) {
            throw boom.notFound('Payment not found')
        }
        return paymentVoucher
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

    async deletePV(id, idPayment) {
        try {
            const paymentVoucher = await this.findOnePV(id, idPayment)
            await paymentVoucher.destroy()
            return { id }
        } catch (error) {
            throw boom.notFound(`Payment with ${id} not delete`)
        }
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
