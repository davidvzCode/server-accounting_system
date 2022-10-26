const express = require('express')
const router = express.Router()

const UsersService = require('../services/users.services')
const validatorHadler = require('../middleware/validator.handler')
const {
    createUserSchema,
    getUserSchema,
    updateUserSchema,
} = require('../schemas/user.schema')

const service = new UsersService()

router.get('/', async (req, res) => {
    const users = await service.find()
    res.json(users)
})

router.get(
    '/:id',
    validatorHadler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const users = await service.findOne(id)
            res.json(users)
        } catch (error) {
            next(error)
        }
    }
)

router.post(
    '/',
    validatorHadler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body
            const users = await service.create(body)
            res.status(201).json(users)
        } catch (error) {
            next(error)
        }
    }
)

router.patch(
    '/:id',
    validatorHadler(getUserSchema, 'params'),
    validatorHadler(updateUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const body = req.body
            const user = await service.update(id, body)
            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }
)

router.delete(
    '/:id',
    validatorHadler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const user = await service.delete(id)
            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router
