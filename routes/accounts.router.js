const express = require('express')
const router = express.Router()
const passport = require('passport')

const AccountService = require('../services/accounts.services')
const validatorHadler = require('../middleware/validator.handler')
const {
    createAccountSchema,
    getAccountSchema,
    updateAccountSchema,
    getAllAccountSchema,
    atocompleteVoucherSchema,
} = require('../schemas/account.schema')

const service = new AccountService()

router.get(
    '/',
    validatorHadler(getAllAccountSchema, 'query'),
    //passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const account = await service.find(req.query)
            res.json(account)
        } catch (error) {
            next(error)
        }
    }
)

router.get(
    '/autocomplete/:search',
    //passport.authenticate('jwt', { session: false }),
    validatorHadler(atocompleteVoucherSchema, 'params'),
    async (req, res, next) => {
        try {
            const { search } = req.params
            const account = await service.autocomplete(search)
            res.json(account)
        } catch (error) {
            next(error)
        }
    }
)

router.get(
    '/:id',
    //passport.authenticate('jwt', { session: false }),
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
    //passport.authenticate('jwt', { session: false }),
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
    //passport.authenticate('jwt', { session: false }),
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
    //passport.authenticate('jwt', { session: false }),
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
