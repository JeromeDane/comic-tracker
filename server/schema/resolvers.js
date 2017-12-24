const {findSeriess} = require('../database.js')

module.exports = {
  Query: {
    series: () => new Promise(resolve => findSeriess().callback((err, data) => resolve(data)))
  }
}
