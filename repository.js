const QueryBuilder = require('./query-builder.js')

class Repository {
  constructor (config) {
    this.tableName = config.tableName
    this.QueryBuilder = config.QueryBuilder || QueryBuilder
    this.knex = config.knex
    this.queryBuilderOptions = config.queryBuilderOptions
  }

  all () {
    return this.filter({})
  }

  _createQueryBuilder () {
    return new this.QueryBuilder(this.knex(this.tableName), this.queryBuilderOptions)
  }


  filter (...args) {
    return this._createQueryBuilder().where(...args)
  }

  update (update) {
    return this._createQueryBuilder().update(...args)
  }

  delete (delete_) {
    return this._createQueryBuilder().delete(delete_)
  }

  insert (data) {
    return this._createQueryBuilder().insert(data)
  }
}

module.exports = function createRepository(config) {
  const repository = new Repository(config)

  function createSubrepository(knex) {
    return new createRepository({ ...config, knex })
  }

  Object.assign(createSubrepository, repository)
  Object.setPrototypeOf(createSubrepository, repository)
  return createSubrepository
}
