require('dotenv').config()
const express = require('express')
const app = express()
const compress = require('compression')
const helmet = require('helmet')
const morgan = require('morgan')
const { connectToMongo } = require('./config')
const auth = require('./modules/auth_route')
const {
  notFoundHandler, errorHandler, removeFavicon, MORGAN_FORMAT, syntaxError
} = require('./utils')

app.use(compress()) // gzip compression
app.use(helmet()) // secure apps by setting various HTTP headers
app.use(express.json({ limit: process?.env?.JSON_LIMIT ?? '3072kb' })) // json limit

const morganFormat = MORGAN_FORMAT
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('short'))
} else {
  app.use(morgan(morganFormat, { stream: process.stderr }))
}
connectToMongo()
app.use(auth)
app.use(notFoundHandler) // 404 handler
app.use(errorHandler) // error handlerr
app.use(syntaxError) // error handlerr syntax
app.use(removeFavicon)

module.exports = app