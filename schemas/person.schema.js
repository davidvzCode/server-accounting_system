const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()
const lastname = Joi.string()
const phone = Joi.string().min(10)
const userId = Joi.number().integer()

const createPersonSchema = Joi.object({
    name: name.required(),
    userId: userId.required(),
    lastname,
    phone,
})

const updatePersonSchema = Joi.object({
    name,
    lastname,
    phone,
})

const getPersonSchema = Joi.object({
    id: id.required(),
})

module.exports = { createPersonSchema, updatePersonSchema, getPersonSchema }
