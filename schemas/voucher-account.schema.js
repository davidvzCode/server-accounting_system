const Joi = require('joi')

const id = Joi.number().integer()
const typeAccount = Joi.string()
const value = Joi.number().min(0)
const accountId = Joi.number().integer()
const voucherId = Joi.number().integer()

const createVoucherAccountSchema = Joi.object().keys({
    typeAccount: typeAccount.required(),
    value: value.required(),
    accountId: accountId.required(),
    voucherId: voucherId.required(),
})

const updateVoucherAccountSchema = Joi.object().keys({
    id: id.required(),
    typeAccount,
    value,
    accountId,
})

const voucher_AccountSchema = Joi.array().items(createVoucherAccountSchema)

const updateVoucher_AccountSchema = Joi.array().items(
    updateVoucherAccountSchema
)

const getVoucherAccountSchema = Joi.object().keys({
    id: id.required(),
})

const deleteAllDeatailSchema = Joi.array().items(getVoucherAccountSchema)

module.exports = {
    createVoucherAccountSchema,
    getVoucherAccountSchema,
    updateVoucherAccountSchema,
    voucher_AccountSchema,
    updateVoucher_AccountSchema,
    deleteAllDeatailSchema,
}
