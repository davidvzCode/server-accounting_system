const boom = require('@hapi/boom')

const { models } = require('../libs/sequelize')

class VoucherService {
    async find() {
        const rta = await models.Voucher.findAll()
        if (!rta) {
            throw boom.notFound('voucher not found')
        }
        return rta
    }

    async create(voucher) {
        const newVoucher = await models.Voucher.create(voucher)
        return newVoucher
    }

    async addItem(data) {
        const newItem = await models.VoucherAccount.create(data)
        return newItem
    }

    async findOne(id) {
        const voucher = await models.Voucher.findByPk(id)
        if (!voucher) {
            throw boom.notFound('voucher not found')
        }
        return voucher
    }

    async update(id, changes) {
        const voucher = await this.findOne(id)
        const rta = await voucher.update(changes)
        return rta
    }

    async delete(id) {
        const voucher = await this.findOne(id)
        await voucher.destroy()
        return { id }
    }
}

module.exports = VoucherService
