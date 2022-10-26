const Joi = require('joi')

const id = Joi.number().integer()
const nfolio = Joi.string()
const voucherId = Joi.number().integer()

const createDaybookSchema = Joi.object({
    nfolio: nfolio.required(),
    voucherId: voucherId.required(),
})

const updateDaybookSchema = Joi.object({
    voucherId,
    nfolio,
})

const getDaybookSchema = Joi.object({
    id: id.required(),
})

module.exports = { createDaybookSchema, getDaybookSchema, updateDaybookSchema }
