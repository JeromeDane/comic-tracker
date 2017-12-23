const client = require('request-json').createClient('https://comicvine.gamespot.com')

module.exports = (key, resource, params = {}) => new Promise((resolve, reject) => {
  try {
    const paramsStr = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&'),
          url = `/api/${resource}/?api_key=${comicVineKey}&format=json&${paramsStr}`

    console.log('Fetching ComicVine', url);

    client.get(url, (err, res, body) => {
      if(err) reject(err)
      resolve(body)
    })
  } catch(e) {
    reject(e)
  }
})
