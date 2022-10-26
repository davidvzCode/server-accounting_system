const express = require('express')
const router = express.Router()

const PaymentService = require('../services/payment.services')
const validatorHadler = require('../middleware/validator.handler')
const {
    createPaymentSchema,
    getPaymentSchema,
    updatePaymentSchema,
} = require('../schemas/payment.schema')

const service = new PaymentService()

router.get('/', async (req, res) => {
    const payment = await service.find()
    res.json(payment)
})

router.get(
    '/:id',
    validatorHadler(getPaymentSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const payment = await service.findOne(id)
            res.json(payment)
        } catch (error) {
            next(error)
        }
    }
)

router.post(
    '/',
    validatorHadler(createPaymentSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body
            const payment = await service.create(body)
            res.status(201).json(payment)
        } catch (error) {
            next(error)
        }
    }
)

router.patch(
    '/:id',
    validatorHadler(getPaymentSchema, 'params'),
    validatorHadler(updatePaymentSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const body = req.body
            const payment = await service.update(id, body)
            res.status(201).json(payment)
        } catch (error) {
            next(error)
        }
    }
)

router.delete(
    '/:id',
    validatorHadler(getPaymentSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const payment = await service.delete(id)
            res.status(201).json(payment)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router
