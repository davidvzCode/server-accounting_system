const Joi = require('joi')

const id = Joi.number().integer()
const typeVoucher = Joi.string().min(6)
const stateInitial = Joi.boolean()
const date = Joi.date()
const beneficiary = Joi.string()
const dniRuc = Joi.string().min(10)
const sum = Joi.string()
const concept = Joi.string()
const bank = Joi.string()
const total = Joi.number().integer()

//
const typeAccount = Joi.string()
const value = Joi.number().integer()
const accountId = Joi.number().integer()
const voucherId = Joi.number().integer()

const createVoucherSchema = Joi.object({
    typeVoucher: typeVoucher.required(),
    stateInitial: stateInitial.required(),
    date: date.required(),
    beneficiary: beneficiary.required(),
    dniRuc: dniRuc.required(),
    sum: sum.required(),
    concept: concept.required(),
    bank: bank.required(),
    total: total.required(),
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
    total,
})

const getVoucherSchema = Joi.object({
    id: id.required(),
})

const addItemSchema = Joi.object({
    typeAccount: typeAccount.required(),
    value: value.required(),
    accountId: accountId.required(),
    voucherId: voucherId.required(),
})

module.exports = {
    createVoucherSchema,
    getVoucherSchema,
    updateVoucherSchema,
    addItemSchema,
}
