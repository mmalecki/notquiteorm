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
  console.log(await repo.insert({ name: 'Latte', unit: 'ea' }))
  console.log(await repo.filter('name', 'like', '%Latte%'))
  console.log(await repo.filter({ name: 'Latte' }).update({ name: 'Double Latte' }))
  console.log(await repo.filter({ name: 'Double Latte' }))
  console.log(await repo.filter({ name: 'Double Latte' }).update({ name: 'Latte' }))
}

main()
