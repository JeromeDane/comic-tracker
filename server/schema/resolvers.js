const {series} = require('../database.js'),
      score = require('string-score'),
      comicVine = require('../comicvine'),
      {saveSeries} = require('../database')

const comicVineKey = process.env.COMICVINE_API_KEY

const fetch = comicVine.bind(null, comicVineKey)

const queriesLastRun = {}

module.exports = {
  Query: {
    series: (_, {query}) => new Promise(resolve => {
      const fetchSeries = callback => {
        series.find().filter(doc => query ? score(doc.name, query) > .3 : true)
          .callback((err, data) => callback(data))
      }
      if(!queriesLastRun[query] || Date.now() - queriesLastRun[query] > 60 * 60 * 1000) {
        queriesLastRun[query] = Date.now()
        fetch('volumes', {filter: `name:${query}`}).then(({results}) => { // note that ComicVine calls a comic series a "volume"
          results.map(series => saveSeries(series))
          resolve(results)
        })
      }
      else fetchSeries(resolve)
    }),
    serie: (_, {id}) => new Promise(resolve => {
      series.one().filter(doc => doc.id == id)
        .callback((err, data) => resolve(data))
    })
  }
}
