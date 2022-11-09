'use strict'
const { USER_TABLE, UserSchema } = require('../models/user.model')
const { PERSON_TABLE, PersonSchema } = require('../models/person.model')
const { ACCOUNT_TABLE, AcountSchema } = require('../models/account.model')
const { PAYMENT_TABLE, PaymentSchema } = require('../models/payment.model')
const { VOUCHER_TABLE, VoucherSchema } = require('../models/voucher.model')
const {
    VOUCHER_ACCOUNT_TABLE,
    VoucherAccountSchema,
} = require('../models/voucher-account.model')
const {
    PAYMENT_VOUCHER_TABLE,
    PaymentVoucherSchema,
} = require('../models/payment-voucher.model')
const { JOURNAL_TABLE, JournalSchema } = require('../models/journal.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(USER_TABLE, UserSchema)
        await queryInterface.createTable(PERSON_TABLE, PersonSchema)
        await queryInterface.createTable(ACCOUNT_TABLE, AcountSchema)
        await queryInterface.createTable(PAYMENT_TABLE, PaymentSchema)
        await queryInterface.createTable(VOUCHER_TABLE, VoucherSchema)
        await queryInterface.createTable(
            VOUCHER_ACCOUNT_TABLE,
            VoucherAccountSchema
        )
        await queryInterface.createTable(
            PAYMENT_VOUCHER_TABLE,
            PaymentVoucherSchema
        )
        await queryInterface.createTable(JOURNAL_TABLE, JournalSchema)
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(USER_TABLE)
        await queryInterface.dropTable(PERSON_TABLE)
        await queryInterface.dropTable(ACCOUNT_TABLE)
        await queryInterface.dropTable(PAYMENT_TABLE)
        await queryInterface.dropTable(VOUCHER_TABLE)
        await queryInterface.dropTable(VOUCHER_ACCOUNT_TABLE)
        await queryInterface.dropTable(PAYMENT_VOUCHER_TABLE)
        await queryInterface.dropTable(JOURNAL_TABLE)
    },
}
