const Joi = require('joi')

const id = Joi.number().integer()
const description = Joi.string()
const account = Joi.string()
const signe = Joi.string().min(5)
const typeAccount = Joi.string().min(5)
const typeState = Joi.string()
const total = Joi.number().min(0)
const userId = Joi.number().integer()

const search = Joi.string().empty('')
const orderBy = Joi.string().empty('')
const order = Joi.string().valid('ASC', 'DESC')
const limit = Joi.number().integer()
const offset = Joi.number().integer()

const getAllAccountSchema = Joi.object({
    search,
    orderBy,
    order: order.required(),
    limit: limit.required(),
    offset: offset.required(),
})

const createAccountSchema = Joi.object({
    description: description.required(),
    account: account.required(),
    signe: signe.required(),
    typeAccount: typeAccount.required(),
    typeState: typeState.required(),
    total: total.required(),
    userId: userId.required(),
})

const updateAccountSchema = Joi.object({
    description,
    account,
    signe,
    typeAccount,
    typeState,
    total,
})

const getAccountSchema = Joi.object({
    id: id.required(),
})

const atocompleteVoucherSchema = Joi.object({
    search: search.required(),
})

module.exports = {
    createAccountSchema,
    updateAccountSchema,
    getAccountSchema,
    getAllAccountSchema,
    atocompleteVoucherSchema,
}
