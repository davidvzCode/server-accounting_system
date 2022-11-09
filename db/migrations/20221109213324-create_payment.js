'use strict'
const { PAYMENT_TABLE } = require('../models/payment.model')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(PAYMENT_TABLE, [
            {
                name: 'Efectivo',
                create_at: new Date(),
            },
            {
                name: 'Cheque',
                create_at: new Date(),
            },
            {
                name: 'Retenciones',
                create_at: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete(PAYMENT_TABLE, null, {})
    },
}
