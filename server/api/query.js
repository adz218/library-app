const router = require('express').Router()
const proxy = require('express-http-proxy')
const request = require('request')

router.get('/general', async (req, res, next) => {
  try {
    const formattedSearch = req.body.query.replace(' ', '+')
    request(`http://openlibrary.org/search.json?q=${formattedSearch}`, function(
      error,
      response,
      body
    ) {
      res.json(JSON.parse(body))
    })
  } catch (err) {
    next(err)
  }
})

router.use('/title', async (req, res, next) => {
  try {
    const formattedTitle = req.body.query.replace(' ', '+')
    request(
      `http://openlibrary.org/search.json?title=${formattedTitle}`,
      function(error, response, body) {
        res.json(JSON.parse(body))
      }
    )
  } catch (err) {
    next(err)
  }
})

router.use('/author', async (req, res, next) => {
  try {
    const formattedSearch = req.body.query.replace(' ', '+')
    request(
      `http://openlibrary.org/search.json?author=${formattedAuthor}`,
      function(error, response, body) {
        res.json(JSON.parse(body))
      }
    )
  } catch (err) {
    next(err)
  }
})

module.exports = router
