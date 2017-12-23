const express = require('express'),
      webpackConfig = require('../webpack.config.js'),
      comicVine = require('./comicvine.js'),
      {saveVolume} = require('./database.js')

const app = express(),
      port = webpackConfig.devServer.port + 1
      comicVineKey = process.env.COMICVINE_API_KEY

const fetch = comicVine.bind(null, comicVineKey)

app.get('/api/*', (req, res) =>  {
  fetch('volumes', {filter: 'name:Walking Dead'}).then(data => {
    data.results.forEach(saveVolume)
    res.send(data)
  })
})

app.listen(port, () => console.log(`API server running on port ${port}`))
