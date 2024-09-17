const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const app = express()

// init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
// init db
require('./dbs/InitMongoDB')
const { checkOverLoad } = require('./helpers/CheckConnect')
checkOverLoad()
//init routes
app.use('/', require('./routes/index'))

module.exports = app;