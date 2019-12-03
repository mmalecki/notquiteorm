const errors = require('./errors.js')
const QueryBuilder = require('./query-builder.js')

class OMQueryBuilder extends QueryBuilder {
  constructor (query, options) {
    super(query)
    this.mapper = options.mapper
  }

  where (...args) {
    // Ooohhh weeee, this is gonna be a trip.
    // http://knexjs.org/#Builder-where
    if (args.length === 1 && typeof args[0] === 'object')
      super.where(this.mapper.toRow(args[0]))
    else if (args.length === 2) // Key, value
      super.where(this.mapper.columnName(args[0]), this.mapper.columnValue(args[0], args[1]))
    else if (args.length === 3) // Operator
      super.where(this.mapper.columnName(args[0]), args[1], this.mapper.columnValue(args[0], args[2]))

    return this
  }

  update (update) {
    return super.update(this.mapper.toRow(update)).returning('*')
  }

  insert (data) {
    return super.insert(Array.isArray(data) ? data.map(this.mapper.toRow) : this.mapper.toRow(data))
  }

  then (resolve, reject) {
    return this.query.then(result => {
      if (typeof result === 'object')
        return resolve(Array.isArray(result) ? result.map(i => this.mapper.fromRow(i)) : this.mapper.fromRow(result))

      return resolve(result)
    }, reject)
  }
}

module.exports = OMQueryBuilder
