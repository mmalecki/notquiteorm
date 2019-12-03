const OMRepository = require('../om/repository.js')

class Payment {
  constructor (props) {
    Object.assign(this, props)
  }
}

Payment.tableName = 'payments';

const knex = require('knex')({
  client: 'pg',
  connection: { database: 'pos' }
});

const repo = new OMRepository({
  model: Payment,
  knex: knex,
  tableName: 'payments',
})

async function main() {
  console.log(await repo.all())
  console.log(await repo.filter({ payment_method_id: 1 }))

  const payment = new Payment({ amount: '330', payment_method_id: 2, tab_uuid: 'e067c501-e75f-4e8b-9096-3230ed69dd9b' })
  console.log(await repo.insert(payment))
}
main()
