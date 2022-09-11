const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const userRouter = require('./routes/user.route')

// require .env
require('dotenv').config({ path: '../.env' })
// require config
require('./config/dataBaseConfig')

const app = express()
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/user', userRouter)


app.listen(process.env.PORT || 3700, (error) => {
    if (error) {
        console.log('Error : ', error)
    } else {
        console.log(`Listening on port ${process.env.PORT}`)
    }
})

module.exports = app 