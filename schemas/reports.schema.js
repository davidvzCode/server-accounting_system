const Joi = require('joi')

const date = Joi.date()
const nfolio = Joi.number().integer().min(1)

const searchJournalSchema = Joi.object({
    date,
    nfolio,
})

module.exports = { searchJournalSchema }
