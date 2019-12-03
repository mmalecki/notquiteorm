class NotFound extends Error {
  constructor () {
    super('Row not found')
  }
}

// Name copied from ormnomnom because I couldn't come up with a better one.
class MultipleObjectsReturned extends Error {
  constructor () {
    super('Multiple objects returned, expected 1')
  }
}

exports.NotFound = NotFound
exports.MultipleObjectsReturned = MultipleObjectsReturned
