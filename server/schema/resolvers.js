const {series, issues} = require('../database.js'),
      {scoreAndFilter} = require('../../lib/score'),
      comicVine = require('../comicvine'),
      {saveSeries, saveIssues} = require('../database')

const comicVineKey = process.env.COMICVINE_API_KEY

const fetch = comicVine.bind(null, comicVineKey)

const queriesLastRun = {},
      issuesLastRequested = {}

const getIssues = seriesId => new Promise(resolve => {
  if(!issuesLastRequested[seriesId] || Date.now() - issuesLastRequested[seriesId] > 60 * 60 * 1000) {
    // issuesLastRequested[seriesId] = Date.now()
    fetch('issues', {filter: `volume:${seriesId}`, sort: 'issue_number:asc'}) // note that ComicVine calls a comic series a "series"
      .then(({results}) => {
        results.map(issue => saveIssues(issue))
        resolve(results)
      })
  }
  else {
    issues.find().filter(doc => doc.volume === series)
      .callback((err, data) => resolve(data))
  }
})

module.exports = {
  Query: {
    series: (_, {query}) => new Promise(resolve => {
      if(!queriesLastRun[query] || Date.now() - queriesLastRun[query] > 60 * 60 * 1000) {
        queriesLastRun[query] = Date.now()
        fetch('volumes', {filter: `name:${query}`, sort: 'date_last_updated:desc'})
          .then(({results}) => { // note that ComicVine calls a comic series a "volume"
            results.map(series => saveSeries(series))
            resolve(results)
          })
      }
      else {
        series.find().filter(doc => query ? scoreAndFilter(doc.name, query) : true)
          .callback((err, data) => resolve(data))
      }
    }),
    serie: (_, {id}) => new Promise(resolve => {
      series.one().filter(doc => doc.id == id)
        .callback((err, data) => resolve(data))
    }),
    issues: (_, {series}) => getIssues(series),
    issue: (_, {id}) => new Promise(resolve => {
      fetch('issues', {filter: `id:${id}`}) // note that ComicVine calls a comic series a "series"
        .then(({results}) => {
          results.map(issue => saveIssues(issue))
          resolve(results[0])
        })
    })
  },
  Series: {
    issues: series => getIssues(series.id)
  },
  Issue: {
    series: ({volume}) => volume
  }
}
