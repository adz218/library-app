const router = require('express').Router()
const proxy = require('express-http-proxy')
const request = require('request')

router.use('/', async (req, res, next) => {
  try {
    console.log('reqbody', req.body)
    const formattedTitle = req.body.query.replace(' ', '+')
    request(`http://openlibrary.org/search.json?q=${formattedTitle}`, function(
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

module.exports = router
