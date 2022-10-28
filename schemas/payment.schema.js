const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()

const createPaymentSchema = Joi.object({
    name: name.required(),
})

const updatePaymentSchema = Joi.object({
    name,
})

const getPaymentSchema = Joi.object({
    id: id.required(),
})

module.exports = {
    createPaymentSchema,
    getPaymentSchema,
    updatePaymentSchema,
}
