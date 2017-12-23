const NoSQL = require('nosql'),
      path = require('path')

const databases = {
  volumes: NoSQL.load(path.join(__dirname, '../data/volumes.nosql'))
}

const save = (db, doc) => databases[db].update(doc, doc).where('id', doc.id)

const saveVolume = volume => save('volumes', volume)

module.exports = {
  saveVolume
}
