const express = require('express')
const router = express.Router()
const passport = require('passport')

const VoucherService = require('../services/voucher.services')
const validatorHadler = require('../middleware/validator.handler')
const {
    createVoucherSchema,
    getVoucherSchema,
    updateVoucherSchema,
    addItemSchema,
} = require('../schemas/voucher.schema')

const service = new VoucherService()

router.get('/', async (req, res) => {
    const voucher = await service.find()
    res.json(voucher)
})

router.get(
    '/:id',
    validatorHadler(getVoucherSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const voucher = await service.findOne(id)
            res.json(voucher)
        } catch (error) {
            next(error)
        }
    }
)

router.post(
    '/',
    // passport.authenticate('jwt', { session: false }),
    validatorHadler(createVoucherSchema, 'body'),
    async (req, res, next) => {
        try {
            //const user = req.user;
            const body = req.body
            const voucher = await service.create(body)
            res.status(201).json(voucher)
        } catch (error) {
            next(error)
        }
    }
)

router.post(
    '/add-item',
    validatorHadler(addItemSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body
            const newItem = await service.addItem(body)
            res.status(201).json(newItem)
        } catch (error) {
            next(error)
        }
    }
)

router.patch(
    '/:id',
    validatorHadler(getVoucherSchema, 'params'),
    validatorHadler(updateVoucherSchema, 'body'),
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
    validatorHadler(getVoucherSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const voucher = await service.delete(id)
            res.status(201).json(voucher)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router
