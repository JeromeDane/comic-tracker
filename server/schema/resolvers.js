const {series, findSeries} = require('../database.js'),
      score = require('string-score')

module.exports = {
  Query: {
    series: (_, {query}) => new Promise(resolve =>
      findSeries().filter(doc => query ? score(doc.name, query) > .3 : true)
        .callback((err, data) => resolve(data))
    ),
    serie: (_, {id}) => new Promise(resolve => {
      series.one().filter(doc => doc.id == id)
        .callback((err, data) => resolve(data))
    })
  }
}
