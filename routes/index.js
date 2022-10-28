const express = require('express')

const usersRouter = require('./users.router')
const accountRouter = require('./accounts.router')
const personRouter = require('./person.router')
const voucherRouter = require('./voucher.router')
const paymentRouter = require('./payment.router')
const journalRouter = require('./journal.router')
const authRouter = require('./auth.router')

function routerApi(app) {
    const router = express.Router()
    app.use('/api/v1', router)
    router.use('/users', usersRouter)
    router.use('/auth', authRouter)
    router.use('/person', personRouter)
    router.use('/voucher', voucherRouter)
    router.use('/account', accountRouter)
    router.use('/journal', journalRouter)
    router.use('/payment', paymentRouter)
}

module.exports = routerApi
