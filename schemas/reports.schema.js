const Joi = require('joi')
const JoiDate = require('@joi/date')
const JoiExtended = Joi.extend(JoiDate)

const nfolio = Joi.number().integer().min(1)
const orderBy = Joi.string().empty('')
const order = Joi.string().valid('ASC', 'DESC')
const limit = Joi.number().integer()
const offset = Joi.number().integer()

const searchJournalSchema = Joi.object({
    startDate: JoiExtended.date().format('YYYY-MM-DD').required(),
    endDate: JoiExtended.date()
        .format('YYYY-MM-DD')
        .min(Joi.ref('startDate'))
        .required(),
})

module.exports = { searchJournalSchema }
