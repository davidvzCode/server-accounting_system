const express = require('express')
const router = express.Router()
const passport = require('passport')
const validatorHadler = require('../middleware/validator.handler')

const { searchJournalSchema } = require('../schemas/reports.schema')
const ReportsService = require('../services/reports.services')

const serviceR = new ReportsService()

router.get(
    '/journal',
    //passport.authenticate('jwt', { session: false }),
    validatorHadler(searchJournalSchema, 'query'),
    async (req, res, next) => {
        try {
            const journal = await serviceR.journal(req.query)
            res.json(journal)
        } catch (error) {
            next(error)
        }
    }
)

router.get(
    '/mayores',
    //passport.authenticate('jwt', { session: false }),
    validatorHadler(searchJournalSchema, 'query'),
    async (req, res, next) => {
        try {
            const mayores = await serviceR.mayores()
            res.json(mayores)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router
