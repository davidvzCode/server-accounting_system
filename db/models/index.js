const { User, UserSchema } = require('./user.model')
const { Person, PersonSchema } = require('./person.model')
const { Account, AcountSchema } = require('./account.model')
const { Voucher, VoucherSchema } = require('./voucher.model')
const { Daybook, DaybookSchema } = require('./daybook.model')
const {
    Voucher_Account,
    VoucherAccountSchema,
} = require('./voucher-account.model')
const { Payment, PaymentSchema } = require('./payment.model')
const {
    PaymentVoucher,
    PaymentVoucherSchema,
} = require('./payment-voucher.model')

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize))
    Person.init(PersonSchema, Person.config(sequelize))
    Account.init(AcountSchema, Account.config(sequelize))
    Voucher.init(VoucherSchema, Voucher.config(sequelize))
    Daybook.init(DaybookSchema, Daybook.config(sequelize))
    Payment.init(PaymentSchema, Payment.config(sequelize))

    Voucher_Account.init(
        VoucherAccountSchema,
        Voucher_Account.config(sequelize)
    )
    PaymentVoucher.init(PaymentVoucherSchema, PaymentVoucher.config(sequelize))

    User.associate(sequelize.models)
    Person.associate(sequelize.models)
    Account.associate(sequelize.models)
    Voucher.associate(sequelize.models)
    Daybook.associate(sequelize.models)
    Payment.associate(sequelize.models)
}

module.exports = setupModels
