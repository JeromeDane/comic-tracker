const NoSQL = require('nosql'),
      path = require('path')

const databases = {
  volumes: NoSQL.load(path.join(__dirname, '../data/volumes.nosql'))
}

const save = (db, doc) => {
  doc.updated = Date.now()
  databases[db].update(doc, doc).where('id', doc.id)
}
const find = db => databases[db].find()

const saveVolume = volume => save('volumes', volume)

const findVolumes = () => find('volumes')

module.exports = {
  saveVolume,
  findVolumes
}
