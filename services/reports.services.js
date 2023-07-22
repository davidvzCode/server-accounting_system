const boom = require('@hapi/boom')

const Sequelize = require('../libs/sequelize')
const { Op, query } = require('sequelize')

class ReportsService {
    async journal(query) {
        const { startDate, endDate } = query

        const options = {
            order: [['journal', 'nfolio']],
            include: ['items_accounts', 'items_payments', 'journal'],
            where: {
                date: {
                    [Op.between]: [startDate, endDate],
                },
            },
        }
        const rta = await Sequelize.models.Voucher.findAll(options)
        if (!rta) {
            throw boom.notFound('Journal not found')
        }
        const res = await this.structureJournal(rta)
        return res
        //return rta
    }

    async structureJournal(data) {
        const res = []

        for (const journal of data) {
            for (const account of journal.items_accounts) {
                const payment = []
                journal.items_payments.map((item) =>
                    payment.push(item.PaymentVoucher)
                )
                const cheque = payment.find((item) => item.id === 2)
                //const factura = payment.find((item) => item.id === 2)
                let flujoEfectivo = ''
                let flujoEfectivoFuente = ''
                if (
                    account.account === '1010102' ||
                    account.account === '1010102'
                ) {
                    flujoEfectivo =
                        account.VoucherAccount.typeAccount === 'Debe'
                            ? account.value
                            : ''
                    flujoEfectivoFuente =
                        account.VoucherAccount.typeAccount === 'Haber'
                            ? account.value
                            : ''
                }

                const aux = {
                    fecha: journal.date,
                    mes: journal.mes,
                    nfolio: journal.journal.nfolio,
                    descripcion: account.description,
                    cuenta: account.account,
                    item: String(account.account).substring(0, 3),
                    balance: account.typeState,
                    glosa: journal.concept,
                    cheque: cheque?.description ? cheque?.description : '',
                    factura: '',
                    debe:
                        account.VoucherAccount.typeAccount === 'Debe'
                            ? account.VoucherAccount.value
                            : '',
                    haber:
                        account.VoucherAccount.typeAccount === 'Haber'
                            ? account.VoucherAccount.value
                            : '',
                    observacion: '',
                    flujoEfectivo,
                    flujoEfectivoFuente,
                }
                res.push(aux)
            }
            const total = {
                fecha: '',
                mes: '',
                nfolio: '',
                descripcion: '',
                cuenta: '',
                item: '',
                balance: '',
                glosa: '',
                cheque: '',
                factura: '',
                debe: journal.total,
                haber: journal.total,
                observacion: '',
                flujoEfectivo: '',
                flujoEfectivoFuente: '',
            }
            res.push(total)
        }
        return res
    }

    async mayores(query) {
        const { startDate, endDate } = query
        const rta = await Sequelize.query(
            `
            SELECT 
                to_char(vouchers.date,'YYYY-MM-DD') as date,
                journal.nfolio,
                accounts.description,
                accounts.account,
                vouchers.concept,
                CASE
                    WHEN vouchers_accounts.type_account = 'Debe' THEN vouchers_accounts.value
                    WHEN vouchers_accounts.type_account = 'Haber' THEN 0
                END as debe,
                CASE
                    WHEN vouchers_accounts.type_account = 'Debe' THEN 0
                    WHEN vouchers_accounts.type_account = 'Haber' THEN vouchers_accounts.value
                END as haber
            FROM 
                vouchers
            INNER JOIN vouchers_accounts ON vouchers_accounts.voucher_id = vouchers.id
            INNER JOIN accounts ON vouchers_accounts.account_id = accounts.id
            INNER JOIN journal ON journal.voucher_id = vouchers.id
            WHERE
                DATE(vouchers.date) BETWEEN '${startDate}' AND '${endDate}' 
                ORDER BY accounts.id , vouchers.date
            `,
            { type: Sequelize.QueryTypes.SELECT }
        )
        if(rta.length > 0){
            const res = this.structureMayores(rta)
            return res
        }
        return []
        
    }

    async structureMayores(data) {
        const res = []
        let account = data[0]?.account || 0
        let totalDebe = 0
        let totalHaber = 0
        let cont = 0
        let firstAccount = 0
        let saldo = 0
        for (const mayores of data) {
            if (account === mayores.account) {
                totalDebe = totalDebe + mayores.debe
                totalHaber = totalHaber + mayores.haber
                if (firstAccount !== 0) firstAccount = saldo
            } else {
                res.push({
                    date: '',
                    nfolio: '',
                    description: mayores.description,
                    account: data[cont - 1].account,
                    concept: 'Total',
                    debe: totalDebe,
                    haber: totalHaber,
                    saldo: '',
                })
                account = mayores.account
                totalDebe = mayores.debe
                totalHaber = mayores.haber
            }
            saldo = Math.abs(firstAccount + mayores.debe - mayores.haber)
            res.push({
                ...mayores,
                saldo,
            })
            cont++
            if (cont < data.length - 1) {
                if (data[cont].account !== account) firstAccount = 0
                else firstAccount = 1
            }
        }
        res.push({
            date: '',
            nfolio: '',
            description: data[data.length - 1].description,
            account: data[data.length - 1].account,
            concept: 'Total',
            debe: totalDebe,
            haber: totalHaber,
            saldo: '',
        })
        return res
    }

    async findbyNfolio() {
        const journal = await Sequelize.models.Journal.max('nfolio')
        if (!journal) {
            return 0
        }
        return journal
    }
}

module.exports = ReportsService
