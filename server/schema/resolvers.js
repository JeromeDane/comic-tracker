const {findVolumes} = require('../database.js')

module.exports = {
  Query: {
    volumes: () => new Promise(resolve => findVolumes().callback((err, data) => resolve(data))),
  }
}
