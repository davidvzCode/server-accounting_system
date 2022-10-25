const { User, UserSchema } = require('./user.model')
const { Person, PersonSchema } = require('./person.model')
const { Account, AcountSchema } = require('./account.model')
const { Voucher, VoucherSchema } = require('./voucher.model')
const { Daybook, DaybookSchema } = require('./daybook.model')
const { DetailVoucher, DetailVoucherSchema } = require('./detailVoucher.model')
const { Payment, PaymentSchema } = require('./payment.model')
const {
    PaymentVoucher,
    PaymentVoucherSchema,
} = require('./paymentVoucher.model')

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize))
    Person.init(PersonSchema, Person.config(sequelize))
    Account.init(AcountSchema, Account.config(sequelize))
    Voucher.init(VoucherSchema, Voucher.config(sequelize))
    Daybook.init(DaybookSchema, Daybook.config(sequelize))
    DetailVoucher.init(DetailVoucherSchema, DetailVoucher.config(sequelize))
    Payment.init(PaymentSchema, Payment.config(sequelize))
    PaymentVoucher.init(PaymentVoucherSchema, Payment.config(sequelize))

    User.associate(sequelize.models)
    Person.associate(sequelize.models)
    Account.associate(sequelize.models)
    Voucher.associate(sequelize.models)
    Daybook.associate(sequelize.models)
    DetailVoucher.associate(sequelize.models)
    Payment.associate(sequelize.models)
    PaymentVoucher.associate(sequelize.models)
}

module.exports = setupModels
