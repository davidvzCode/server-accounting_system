const express = require('express')
const router = express.Router()
const passport = require('passport')

const VoucherService = require('../services/voucher.services')
const validatorHadler = require('../middleware/validator.handler')
const {
    createVoucherSchema,
    getVoucherSchema,
    updateVoucherSchema,
    getAllVoucherSchema,
} = require('../schemas/voucher.schema')

const {
    voucher_AccountSchema,
    deleteAllDeatailSchema,
} = require('../schemas/voucher-account.schema')

const service = new VoucherService()

router.get(
    '/',
    //passport.authenticate('jwt', { session: false }),
    validatorHadler(getAllVoucherSchema, 'query'),
    async (req, res) => {
        const voucher = await service.find(req.query)
        res.json(voucher)
    }
)

router.get(
    '/:id',
    //passport.authenticate('jwt', { session: false }),
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
//[object, object]
router.post(
    '/detail',
    //passport.authenticate('jwt', { session: false }),
    validatorHadler(voucher_AccountSchema, 'body'),
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

// router.post(
//     '/add-item/updateAll',
//     // validatorHadler(getVoucherSchema, 'params'),
//     validatorHadler(updateVoucher_AccountSchema, 'body'),
//     async (req, res, next) => {
//         try {
//             // const { id } = req.params
//             const body = req.body
//             const voucher_account = await service.updateVC(body)
//             res.status(201).json(voucher_account)
//         } catch (error) {
//             next(error)
//         }
//     }
// )

// router.patch(
//     '/:id',
//     //passport.authenticate('jwt', { session: false }),
//     validatorHadler(getVoucherSchema, 'params'),
//     validatorHadler(updateVoucherSchema, 'body'),
//     async (req, res, next) => {
//         try {
//             const { id } = req.params
//             const body = req.body
//             const voucher = await service.update(id, body)
//             res.status(201).json(voucher)
//         } catch (error) {
//             next(error)
//         }
//     }
// )

router.put(
    '/:id',
    //passport.authenticate('jwt', { session: false }),
    validatorHadler(getVoucherSchema, 'params'),
    validatorHadler(updateVoucherSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const body = req.body
            const voucher = await service.update(id, body)
            res.status(201).json(voucher)
        } catch (error) {
            next(error)
        }
    }
)

router.delete(
    '/:id',
    //passport.authenticate('jwt', { session: false }),
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

// voucherId
router.delete(
    '/detail/:id',
    //passport.authenticate('jwt', { session: false }),
    validatorHadler(getVoucherSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const voucher_account = await service.deleteAllDetail(id)
            res.status(201).json(voucher_account)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router
