/* eslint-disable no-undef */
const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')
const bodyParser = require('body-parser')

const app = express()

// app.disable('x-powered-by')

app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT || 3000

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.get('/headers', (req, res) => {
  res.type('text/plain')
  const headers = Object.entries(req.headers)
    .map(([key, value]) => `${key} ${value}}`)
  res.end(headers.join('\n'))
})

// 404
app.use(handlers.notFound)

// 500
app.use(handlers.serverError)

if (require.main === module) {
  app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`
  ))
} else {
  module.exports = app
}

