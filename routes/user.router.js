const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const users = await service.find()
    res.json(users)
})
