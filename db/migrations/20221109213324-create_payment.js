'use strict'
const { PAYMENT_TABLE } = require('../models/payment.model')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(PAYMENT_TABLE, [
            {
                name: 'Efectivo',
            },
            {
                name: 'Cheque',
            },
            {
                name: 'Retenciones',
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete(PAYMENT_TABLE, null, {})
    },
}
