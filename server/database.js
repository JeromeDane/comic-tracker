const NoSQL = require('nosql'),
      path = require('path')

const series = NoSQL.load(path.join(__dirname, '../data/series.nosql')),
      issues = NoSQL.load(path.join(__dirname, '../data/issues.nosql')),
      databases = {series, issues}

const save = (db, doc) => new Promise(resolve => {
  doc.updated = Date.now()
  return databases[db].update(doc, doc).where('id', doc.id).callback(resolve)
})

const saveSeries = series => save('series', series),
      saveIssues = issues => save('issues', issues)

module.exports = {
  series,
  issues,
  saveSeries,
  saveIssues
}
