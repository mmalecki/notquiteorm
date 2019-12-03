const Repository = require('../repository')
const knex = require('knex')({
  client: 'pg',
  connection: { database: 'products' }
});

const repo = new Repository({
  knex,
  tableName: 'products',
})

async function main() {
  console.log(await repo.filter('name', 'like', '%Latte%'))
  await knex.transaction(async trx => {
    const trxRepo = repo(trx)
    console.log(await trxRepo.insert({ name: 'Latte', unit: 'ea' }))
    console.log(await trxRepo.filter({ name: 'Latte' }).update({ name: 'Double Latte' }))
    console.log(await trxRepo.filter({ name: 'Double Latte' }))
    return trxRepo.filter({ name: 'Double Latte' }).update({ name: 'Latte' })
  })
  console.log(await repo.filter('name', 'like', '%Latte%'))
}

main()
