const boom = require('@hapi/boom')

const { models } = require('../libs/sequelize')
const sequelize = require('../libs/sequelize')

const ReportsService = require('./reports.services')

const reportS = new ReportsService()

class VoucherService {
    async find() {
        const rta = await models.Voucher.findAll({
            include: ['items_accounts', 'items_payments'],
        })
        if (!rta) {
            throw boom.notFound('voucher not found')
        }
        return rta
    }

    async create(voucher) {
        let nfolio = await reportS.findbyNfolio()
        nfolio++
        console.log(voucher)
        const newVoucher = await models.Voucher.create(
            {
                ...voucher,
                journal: {
                    nfolio,
                },
            },
            { include: 'journal' }
        )
        return newVoucher
    }

    async addItem(data) {
        const t = await sequelize.transaction()
        try {
            const newItem = await models.VoucherAccount.bulkCreate(data, {
                transaction: t,
            })
            await t.commit()

            return newItem
        } catch (error) {
            await t.rollback()
            throw boom.notFound('Error')
        }
    }

    async updateVC(objs) {
        const t = await sequelize.transaction()
        try {
            for (let i = 0; i < objs.length; i++) {
                const voucher_account = await models.VoucherAccount.findByPk(
                    objs[i].id
                )
                await voucher_account.update(objs[i], {
                    transaction: t,
                })
            }
            await t.commit()
            return 'OK'
        } catch (error) {
            await t.rollback()
            throw boom.notFound('Error')
        }
    }

    async deleteAllDetail(id) {
        const t = await sequelize.transaction()
        try {
            await models.VoucherAccount.destroy({
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

    async findOne(id) {
        const voucher = await models.Voucher.findByPk(id, {
            include: ['items_accounts', 'items_payments'],
        })
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
