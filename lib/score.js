const stringScore = require('string-score'),
      removeAccents = require('remove-accents')

const prep = str => removeAccents(str.replace(/^\s+/, '').replace(/\s+$/, '')),
      score = (subject, query) => Math.round(stringScore(prep(subject), prep(query), .5) * 100) / 100,
      checkScore = val => val > .6

module.exports = {
  score,
  checkScore,
  scoreAndFilter: (subject, query) => checkScore(score(subject, query))
}
