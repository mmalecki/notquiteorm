const Repository = require('../repository.js')
const Mapper = require('./mapper.js')
const OMQueryBuilder = require('../query-builder.js')

class OMRepository extends Repository {
  constructor (config) {
    super({ ...config, QueryBuilder: OMQueryBuilder })
    this.queryBuilderOptions = { mapper: new Mapper(config.model), model: config.model }
  }
}

module.exports = OMRepository
