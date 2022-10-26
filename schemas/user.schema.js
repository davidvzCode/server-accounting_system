const Joi = require('joi')

const id = Joi.number().integer()
const email = Joi.string().email()
const password = Joi.string().min(3)
const role = Joi.string().min(4)
const urlPerfil = Joi.string()

const createUserSchema = Joi.object({
    email: email.required(),
    password: password.required(),
    role: role.required(),
    urlPerfil,
})

const updateUserSchema = Joi.object({
    email,
    password,
    role,
    urlPerfil,
})

const getUserSchema = Joi.object({
    id: id.required(),
})

module.exports = { createUserSchema, getUserSchema, updateUserSchema }
