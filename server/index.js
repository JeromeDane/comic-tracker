const express = require('express'),
      webpackConfig = require('../webpack.config.js')

const app = express(),
      port = webpackConfig.devServer.port + 1

app.get('/api/*', (req, res) => {
  res.send('Hello API!')
})

app.listen(port, () => console.log(`API server running on port ${port}`))
