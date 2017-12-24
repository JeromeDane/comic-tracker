const {findSeries} = require('../database.js')

module.exports = {
  Query: {
    series: () => new Promise(resolve => findSeries().callback((err, data) => resolve(data)))
  }
}
