const express = require('express'),
      bodyParser = require('body-parser'),
      {graphqlExpress, graphiqlExpress} = require('apollo-server-express'),
      schema = require('./schema'),
      webpackConfig = require('../webpack.config.js'),
      comicVine = require('./comicvine.js'),
      {saveSeries} = require('./database.js')

const app = express(),
      port = webpackConfig.devServer.port + 1,
      comicVineKey = process.env.COMICVINE_API_KEY

const fetch = comicVine.bind(null, comicVineKey)

app.get('/api/*', (req, res) => {
  fetch('volumes', {filter: 'name:Walking Dead'}).then(data => { // note that ComicVine calls a comic series a "volume"
    data.results.forEach(saveSeries)
    res.send(data)
  })
})

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

app.listen(port, () => console.log(`API server running on port ${port}`))
