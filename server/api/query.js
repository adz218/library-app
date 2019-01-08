const router = require('express').Router()
const proxy = require('express-http-proxy')
const request = require('request')

router.get('/general/:query', async (req, res, next) => {
  try {
    request(
      `http://openlibrary.org/search.json?q=${req.params.query}`,
      function(error, response, body) {
        console.log('if null response', JSON.parse(body))
        res.json(JSON.parse(body))
      }
    )
  } catch (err) {
    next(err)
  }
})

router.get('/title/:query', async (req, res, next) => {
  try {
    request(
      `http://openlibrary.org/search.json?title=${req.params.query}`,
      function(error, response, body) {
        res.json(JSON.parse(body))
      }
    )
  } catch (err) {
    next(err)
  }
})

router.use('/author/:query', async (req, res, next) => {
  try {
    request(
      `http://openlibrary.org/search.json?author=${req.params.query}`,
      function(error, response, body) {
        res.json(JSON.parse(body))
      }
    )
  } catch (err) {
    next(err)
  }
})

module.exports = router
