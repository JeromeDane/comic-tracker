const NoSQL = require('nosql'),
      path = require('path'),
      mkdirp = require('mkdirp')

mkdirp(path.join(__dirname, '../data'))

const series = NoSQL.load(path.join(__dirname, '../data/series.nosql')),
      issues = NoSQL.load(path.join(__dirname, '../data/issues.nosql')),
      users = NoSQL.load(path.join(__dirname, '../data/users.nosql')),
      databases = {series, issues}

const save = (db, doc) => new Promise(resolve => {
  doc.updated = Date.now()
  return databases[db].update(doc, doc).where('id', doc.id).callback(resolve)
})

const saveSeries = series => save('series', series),
      saveIssue = issues => save('issues', issues),
      saveUser = user => new Promise(resolve => {
        users.update(user, user).where('googleId', user.googleId).callback(resolve)
      })

module.exports = {
  series,
  issues,
  users,
  saveSeries,
  saveIssue,
  saveUser
}
