const NoSQL = require('nosql'),
      path = require('path')

const series = NoSQL.load(path.join(__dirname, '../data/series.nosql'))

const databases = {series}

const save = (db, doc) => {
  doc.updated = Date.now()
  databases[db].update(doc, doc).where('id', doc.id)
}
const find = db => databases[db].find()

const saveSeries = series => save('series', series)

const findSeries = () => find('series')

module.exports = {
  saveSeries,
  findSeries,
  series
}
