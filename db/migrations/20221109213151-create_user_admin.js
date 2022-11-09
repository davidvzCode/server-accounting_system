'use strict'
const { USER_TABLE } = require('../models/user.model')
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const hash = await bcrypt.hash('123', 10)
        await queryInterface.bulkInsert(USER_TABLE, [
            {
                email: 'davidvz.code@gmail.com',
                password: hash,
                role: 'admin',
                create_at: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete(USER_TABLE, null, {})
    },
}
