const Joi = require('joi')

const id = Joi.number().integer()
const nfolio = Joi.string()
const voucherId = Joi.number().integer()

const createJournalSchema = Joi.object({
    nfolio: nfolio.required(),
    voucherId: voucherId.required(),
})

const updateJournalSchema = Joi.object({
    voucherId,
    nfolio,
})

const getJournalSchema = Joi.object({
    id: id.required(),
})

module.exports = { createJournalSchema, getJournalSchema, updateJournalSchema }
