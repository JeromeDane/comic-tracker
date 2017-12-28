const express = require('express'),
      bodyParser = require('body-parser'),
      {graphqlExpress, graphiqlExpress} = require('apollo-server-express'),
      GoogleAuth = require('google-auth-library'),
      session = require('express-session'),
      schema = require('./schema'),
      webpackConfig = require('../webpack.config.js'),
      {saveUser} = require('./database'),
      googleClientId = require('../lib/google-client-id')

const app = express(),
      port = webpackConfig.devServer.port + 1,
      googleAuthClient = new (new GoogleAuth()).OAuth2(googleClientId, '', ''),
      isGoogleAuthorized = (token, googleId) => new Promise((resolve, reject) => {
        googleAuthClient.verifyIdToken(
          token,
          googleClientId,
          function(e, login) {
            const payload = login.getPayload()
            if(payload['sub'] == googleId) resolve()
            else reject()
          }
        )
      })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({secret: process.env.COMICVINE_API_KEY, cookie: {maxAge: 24 * 60000}}))
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

app.get('/api/session', function(req, res) {
  const user = req.session.user || {}
  isGoogleAuthorized(user.googleToken, user.googleId).then(() => {
    res.send(JSON.stringify(user))
  })
    .catch(() => res.send('{}'))
})
app.post('/api/session', function(req, res) {
  isGoogleAuthorized(req.body.googleToken, req.body.googleId).then(() => {
    saveUser(req.body).then(() => {
      req.session.user = req.body
      res.send(req.body)
    })
  })
})

app.listen(port, () => console.log(`API server running on port ${port}`))
