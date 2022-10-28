const express = require('express')
const router = express.Router()

const JournalService = require('../services/journal.services')
const validatorHadler = require('../middleware/validator.handler')
const { getJournalSchema } = require('../schemas/journal.schema')

const service = new JournalService()

router.get(
    '/:id',
    validatorHadler(getJournalSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const journal = await service.findOne(id)
            res.json(journal)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router
