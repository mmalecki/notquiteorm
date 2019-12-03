class Mapper {
  constructor (model) {
    this.model = model
    this.fields = model.fields || {}
    this.fieldByColumn = {}
    Object.keys(this.fields).forEach(field => {
      this.fieldByColumn[this.fields[field].column] = field
    })
  }

  fromRow (row) {
    const entity = {}
    Object.keys(row).forEach(column => {
      if (this.fieldByColumn[column]) entity[this.fieldByColumn[column]] = row[column]
      else entity[column] = row[column]
    })
    return new this.model(entity)
  }

  toRow (entity) {
    const row = {}

    if (entity.toRow) return entity.toRow()

    Object.keys(entity).forEach(field => {
      if (this.fields[field]) row[this.fields[field].column] = entity[field]
      else row[field] = entity[field]
    })

    return row
  }
}

module.exports = Mapper
