const express = require('express')
const router = express.Router()

const AccountService = require('../services/accounts.services')
const validatorHadler = require('../middleware/validator.handler')
const {
    createAccountSchema,
    getAccountSchema,
    updateAccountSchema,
} = require('../schemas/account.schema')

const service = new AccountService()

router.get('/', async (req, res) => {
    const account = await service.find()
    res.json(account)
})

router.get(
    '/:id',
    validatorHadler(getAccountSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const account = await service.findOne(id)
            res.json(account)
        } catch (error) {
            next(error)
        }
    }
)

router.post(
    '/',
    validatorHadler(createAccountSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body
            const account = await service.create(body)
            res.status(201).json(account)
        } catch (error) {
            next(error)
        }
    }
)

router.patch(
    '/:id',
    validatorHadler(getAccountSchema, 'params'),
    validatorHadler(updateAccountSchema, 'body'),
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
    validatorHadler(getAccountSchema, 'params'),
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
