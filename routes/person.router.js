const express = require('express')
const router = express.Router()
const passport = require('passport')

const PersonService = require('../services/person.services')
const validatorHadler = require('../middleware/validator.handler')
const {
    createPersonSchema,
    getPersonSchema,
    updatePersonSchema,
} = require('../schemas/person.schema')

const service = new PersonService()

router.get(
    '/',
    //passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const person = await service.find()
        res.json(person)
    }
)

router.get(
    '/:id',
    //passport.authenticate('jwt', { session: false }),
    validatorHadler(getPersonSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const person = await service.findOne(id)
            res.json(person)
        } catch (error) {
            next(error)
        }
    }
)

router.post(
    '/',
    //passport.authenticate('jwt', { session: false }),
    validatorHadler(createPersonSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body
            const person = await service.create(body)
            res.status(201).json(person)
        } catch (error) {
            next(error)
        }
    }
)

router.patch(
    '/:id',
    //passport.authenticate('jwt', { session: false }),
    validatorHadler(getPersonSchema, 'params'),
    validatorHadler(updatePersonSchema, 'body'),
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
    validatorHadler(getPersonSchema, 'params'),
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
