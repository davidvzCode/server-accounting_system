const Joi = require('joi')

const id = Joi.number().integer()
const description = Joi.string()
const total = Joi.number().min(0)
const voucherId = Joi.number().integer()
const paymentId = Joi.number().integer()

const createPaymentVoucherSchema = Joi.object({
    description: description.required(),
    total: total.required(),
    paymentId: paymentId.required(),
    voucherId: voucherId.required(),
})

const updatePaymentVoucherSchema = Joi.object({
    description,
    total,
    paymentId,
    voucherId,
})

const getPaymentVoucherSchema = Joi.object({
    id: id.required(),
})

module.exports = {
    createPaymentVoucherSchema,
    updatePaymentVoucherSchema,
    getPaymentVoucherSchema,
}
