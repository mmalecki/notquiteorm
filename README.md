# notquiteorm
An experiment in building a tiny, [knex](https://knexjs.org)-based,
Repository Pattern-like ORM. It leaves your models be (no `Model#save()`, etc.)
aims to provide basic Object Mapping with flexible serialization and deserialization
from to/from the database, powerful filtering with easy drop-down to knex via
the filter function.

Of course, close to none of this is implemented.

## Usage

### Repository
This is a basic Repository Pattern-like data access layer.

```js
const Repository = require('notquiteorm/repository')
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
  console.log(await repo.filter('name', 'Latte'))
  console.log(await repo.filter(name, 'like', '%Latte%').update({ name: 'Double Latte' }))
  console.log(await repo.filter({ name: 'Double Latte' }))
  console.log(await repo.filter({ name: 'Double Latte' }).update({ name: 'Latte' }))
}

main()
```

### Object Mapper Repository
An Object Mapper Repository provides optional column name to field mapping via
a fields definition.

Examples:
  * [Model definition](https://github.com/mmalecki/notquiteorm/tree/master/examples/om)
  * [No configuration](https://github.com/mmalecki/notquiteorm/blob/master/examples/om-minimal.js)
