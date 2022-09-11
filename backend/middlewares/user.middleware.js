const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const asyncHandler = require('express-async-handler')

const userMiddleware = asyncHandler(async (req, res, next) => {
    var token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findOne({ _id: decodedToken.id }).select('-password')

            next()

        } catch (error) {
            res.status(401).json({ error: 'Not authorized' })
        }
    }

    if (!token) {
        res.status(401).json({ error: 'Not authorized , no token.' })
    }
})

module.exports = userMiddleware