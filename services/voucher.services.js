const boom = require('@hapi/boom')

const Sequelize = require('../libs/sequelize')

const { Op } = require('sequelize')
const ReportsService = require('./reports.services')
const PaymentService = require('./payment.services')

const reportS = new ReportsService()
const paymentService = new PaymentService()

class VoucherService {
    async find(query) {
        const options = {
            where: {},
            include: ['items_accounts'],
            order: [],
        }
        const { search, orderBy, order, limit, offset } = query

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
                        Sequelize.fn('lower', Sequelize.col('concept')),
                        {
                            [Op.like]: `%${search}%`,
                        }
                    ),
                    Sequelize.where(
                        Sequelize.fn('lower', Sequelize.col('beneficiary')),
                        {
                            [Op.like]: `%${search}%`,
                        }
                    ),
                    {
                        dniRuc: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                ],
            }
        }

        const rta = await Sequelize.models.Voucher.findAndCountAll(options)
        rta.count = rta.rows.length
        if (!rta) {
            throw boom.notFound('voucher not found')
        }
        return rta
    }

    async create(voucher) {
        try {
            return await Sequelize.transaction(async (t) => {
                let nfolio = await reportS.findbyNfolio()
                nfolio++
                const arrObjDetail = voucher.arrObjDetail
                const arrObjPayment = voucher.arrObjPayment
                delete voucher.arrObjDetail
                delete voucher.arrObjPayment
                const newVoucher = await Sequelize.models.Voucher.create(
                    {
                        ...voucher,
                        journal: {
                            nfolio,
                        },
                    },
                    { include: 'journal' },
                    {
                        transaction: t,
                    }
                )
                const id = newVoucher.dataValues.id
                await this.addItem(id, arrObjDetail)
                await paymentService.addItem(id, arrObjPayment)
                return newVoucher
            })
        } catch (error) {
            throw boom.notFound('Error')
        }
    }

    async addItem(voucherId, data) {
        try {
            const detail = []
            for (const det of data) {
                const aux = {
                    ...det,
                    voucherId,
                }
                detail.push(aux)
            }
            const newItem = await Sequelize.models.VoucherAccount.bulkCreate(
                detail
            )

            return newItem
        } catch (error) {
            throw boom.notFound('Error')
        }
    }

    async updateVC(id, objs) {
        const t = await Sequelize.transaction()
        try {
            for (const vc of objs) {
                const { accountId } = vc
                const voucher_account =
                    await Sequelize.models.VoucherAccount.findOne({
                        where: {
                            voucherId: id,
                            accountId,
                        },
                    })
                await voucher_account.update(vc, {
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
        const t = await Sequelize.transaction()
        try {
            await Sequelize.models.VoucherAccount.destroy({
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
        const voucher = await Sequelize.models.Voucher.findByPk(id, {
            include: ['items_accounts', 'items_payments'],
        })
        if (!voucher) {
            throw boom.notFound('voucher not found')
        }
        return voucher
    }

    async findOneVC(id, accountId) {
        const VoucherAccount = await Sequelize.models.VoucherAccount.findOne({
            where: {
                voucherId: id,
                accountId,
            },
        })
        if (!VoucherAccount) {
            throw boom.notFound('voucher account not found')
        }
        return VoucherAccount
    }

    async update(id, changes) {
        try {
            return await Sequelize.transaction(async (t) => {
                const voucher = await this.findOne(id)
                const {
                    typeVoucher,
                    stateInitial,
                    date,
                    beneficiary,
                    dniRuc,
                    sum,
                    concept,
                    bank,
                    arrObjAddDetail,
                    arrObjUpdateDetail,
                    arrObjDeleteDetail,
                    arrObjAddPayment,
                    arrObjUpdatePayment,
                    arrObjDeletePayment,
                } = changes
                const newVoucher = {
                    typeVoucher,
                    stateInitial,
                    date,
                    beneficiary,
                    dniRuc,
                    sum,
                    concept,
                    bank,
                }
                const rta = await voucher.update(newVoucher, {
                    transaction: t,
                })

                if (arrObjAddDetail.length > 0)
                    await this.addItem(id, arrObjAddDetail)
                if (arrObjAddPayment.length > 0)
                    await paymentService.addItem(id, arrObjAddPayment)

                //update
                if (arrObjUpdateDetail.length > 0)
                    await this.updateVC(id, arrObjUpdateDetail)
                if (arrObjUpdatePayment.length > 0) {
                    for (const payment of arrObjUpdatePayment) {
                        await paymentService.updatePV(id, payment)
                    }
                }

                //delete
                if (arrObjDeleteDetail.length > 0) {
                    for (const idDetail of arrObjDeleteDetail) {
                        await this.deleteVC(id, idDetail)
                    }
                }
                if (arrObjDeletePayment.length > 0) {
                    for (const idPayment of arrObjDeletePayment) {
                        await paymentService.deletePV(id, idPayment)
                    }
                }
                return {
                    voucherId: id,
                }
            })
        } catch (error) {
            throw boom.notFound(error)
        }
    }

    async delete(id) {
        try {
            const res = await Sequelize.transaction(async (t) => {
                const voucher = await this.findOne(id)
                await voucher.destroy()
                await this.deleteAllDetail(id)
                return { id }
            })
            return res
        } catch (error) {
            throw boom.notFound('Error')
        }
    }

    async deleteVC(id, idAccount) {
        try {
            const res = await Sequelize.transaction(async (t) => {
                const voucherAccount = await this.findOneVC(id, idAccount)
                await voucherAccount.destroy()
                return { id }
            })
            return res
        } catch (error) {
            throw boom.notFound('Error')
        }
    }
}

module.exports = VoucherService
