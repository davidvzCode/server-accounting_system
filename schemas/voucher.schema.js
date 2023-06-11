const Joi = require('joi')

//voucher
const id = Joi.number().integer()
const typeVoucher = Joi.string().min(6)
const stateInitial = Joi.boolean()
const date = Joi.date()
const beneficiary = Joi.string()
const dniRuc = Joi.string().min(10)
const sum = Joi.string()
const concept = Joi.string()
const bank = Joi.string()

//detail
const typeAccount = Joi.string()
const value = Joi.number().min(0)
const accountId = Joi.number().integer()

//
const description = Joi.string()
const total = Joi.number().min(0)
const paymentId = Joi.number().integer()

//filtros
const search = Joi.string().empty('')
const orderBy = Joi.string().empty('')
const order = Joi.string().valid('ASC', 'DESC')
const limit = Joi.number().integer()
const offset = Joi.number().integer()

const getAllVoucherSchema = Joi.object({
    search,
    orderBy,
    order: order.required(),
    limit: limit.required(),
    offset: offset.required(),
})

const bodyVoucherAccountSchema = Joi.object().keys({
    typeAccount: typeAccount.required(),
    value: value.required(),
    accountId: accountId.required(),
})

const bodyVoucherAccountUpdateSchema = Joi.object().keys({
    typeAccount: typeAccount.required(),
    value: value.required(),
    accountId: accountId.required(),
})

const bodyPaymentVoucherSchema = Joi.object().keys({
    description,
    total: total.required(),
    paymentId: paymentId.required(),
})

const bodyPaymentVoucherUpdateSchema = Joi.object().keys({
    description,
    total: total.required(),
    paymentId: paymentId.required(),
})

const createVoucherSchema = Joi.object({
    typeVoucher: typeVoucher.required(),
    stateInitial: stateInitial.required(),
    date: date.required(),
    beneficiary: beneficiary.required(),
    dniRuc: dniRuc.required(),
    sum: sum.required(),
    concept: concept.required(),
    bank: bank.required(),
    arrObjDetail: Joi.array().items(bodyVoucherAccountSchema),
    arrObjPayment: Joi.array().items(bodyPaymentVoucherSchema),
})

const updateVoucherSchema = Joi.object({
    typeVoucher,
    stateInitial,
    date,
    beneficiary,
    dniRuc,
    sum,
    concept,
    bank,
    arrObjAddDetail: Joi.array().items(bodyVoucherAccountSchema),
    arrObjUpdateDetail: Joi.array().items(bodyVoucherAccountUpdateSchema),
    arrObjDeleteDetail: Joi.array().items(Joi.number()),
    arrObjAddPayment: Joi.array().items(bodyPaymentVoucherSchema),
    arrObjUpdatePayment: Joi.array().items(bodyPaymentVoucherUpdateSchema),
    arrObjDeletePayment: Joi.array().items(Joi.number()),
})

const getVoucherSchema = Joi.object({
    id: id.required(),
})

module.exports = {
    createVoucherSchema,
    getVoucherSchema,
    updateVoucherSchema,
    getAllVoucherSchema,
}
