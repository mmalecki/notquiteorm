const errors = require('./errors.js')

class QueryBuilder {
  constructor (query) {
    this.query = query
  }

  where (...args) {
    this.query = this.query.where(...args)
    return this
  }

  update (update) {
    this.query = this.query.update(update).returning('*')
    return this
  }

  insert (data) {
    this.query = this.query.insert(data).returning('*')
    return this
  }

  delete () {
    this.query = this.query.delete()
    return this
  }

  getOne () {
    this.query = this.query.limit(2)
    return this.then(rows => {
      if (rows.length === 0) throw new errors.NotFound()
      else if (rows.length === 2) throw new errors.MultipleObjectsReturned()
      return rows[0]
    })
  }

  leftJoin (...args) {
    this.query = this.query.leftJoin(...args)
    return this
  }

  then (resolve, reject) {
    return this.query.then(resolve, reject)
  }
}

module.exports = QueryBuilder
