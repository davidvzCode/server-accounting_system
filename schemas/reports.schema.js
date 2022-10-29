const Joi = require('joi')

const date = Joi.date()
const nfolio = Joi.integer().min(1)

const searchJournalSchema = Joi.object({
    date,
    nfolio,
})

module.exports = { searchJournalSchema }
