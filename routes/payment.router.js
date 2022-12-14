const express = require('express')
const router = express.Router()

const passport = require('passport')

const PaymentService = require('../services/payment.services')
const validatorHadler = require('../middleware/validator.handler')
const {
    createPaymentSchema,
    getPaymentSchema,
    updatePaymentSchema,
} = require('../schemas/payment.schema')

const {
    updatePaymentVoucherSchema,
    payment_voucherSchema,
} = require('../schemas/payment-voucher.schema')

const service = new PaymentService()

router.get(
    '/',
    //passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const payment = await service.find()
        res.json(payment)
    }
)

router.get(
    '/:id',
    //passport.authenticate('jwt', { session: false }),
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
    //passport.authenticate('jwt', { session: false }),
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

router.post(
    '/add-voucher',
    //passport.authenticate('jwt', { session: false }),
    validatorHadler(payment_voucherSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body
            const payment_voucher = await service.addItem(body)
            res.status(201).json(payment_voucher)
        } catch (error) {
            next(error)
        }
    }
)

router.patch(
    '/:id',
    //passport.authenticate('jwt', { session: false }),
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

// router.patch(
//     'add-item/:id',
//     validatorHadler(getPaymentSchema, 'params'),
//     validatorHadler(updatePaymentVoucherSchema, 'body'),
//     async (req, res, next) => {
//         try {
//             const { id } = req.params
//             const body = req.body
//             const payment_voucher = await service.updatePV(id, body)
//             res.status(201).json(payment_voucher)
//         } catch (error) {
//             next(error)
//         }
//     }
// )

router.delete(
    '/:id',
    //passport.authenticate('jwt', { session: false }),
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

router.delete(
    '/voucher/:id',
    //passport.authenticate('jwt', { session: false }),
    validatorHadler(getPaymentSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const payment = await service.deleteAllDetail(id)
            res.status(201).json(payment)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router
