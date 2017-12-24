const {series, findSeries} = require('../database.js')

module.exports = {
  Query: {
    series: () => new Promise(resolve =>
      findSeries().callback((err, data) => resolve(data))
    ),
    serie: (_, {id}) => new Promise(resolve => {
      series.one().filter(doc => doc.id == id)
        .callback((err, data) => resolve(data))
    })
  }
}
