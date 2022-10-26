const Joi = require('joi')

const id = Joi.number().integer()
const typeAccount = Joi.string()
const value = Joi.number().min(0)
const accountId = Joi.number().integer()
const voucherId = Joi.number().integer()

const createVoucherAccountSchema = Joi.object({
    typeAccount: typeAccount.required(),
    value: value.required(),
    accountId: accountId.required(),
    voucherId: voucherId.required(),
})

const updateVoucherAccountSchema = Joi.object({
    typeAccount,
    value,
})

const getVoucherAccountSchema = Joi.object({
    id: id.required(),
})

module.exports = {
    createVoucherAccountSchema,
    getVoucherAccountSchema,
    updateVoucherAccountSchema,
}
