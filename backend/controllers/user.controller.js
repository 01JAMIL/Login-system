const User = require('../models/user.model')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { validateRegisterForm, validateLoginForm } = require('../validation/user.validation')


const register = asyncHandler(async (req, res) => {
    const { errors, valid } = validateRegisterForm(req.body)
    if (!valid) {
        return res.status(400).json(errors)
    }

    await User.findOne({ email: req.body.email }).then(async (user) => {
        if (user) {
            return res.status(400).json({ existEmailError: 'This email already exists' })
        }

        const newUser = new User(req.body)
        const salt = await bcrypt.genSalt(10)
        const cryptedPassword = await bcrypt.hash(newUser.password, salt)
        newUser.password = cryptedPassword
        await User.create(newUser).then(() => {
            res.status(200).json({ token: generateToken(newUser._id) })
        }).catch(err => {
            res.status(400).json({ error: 'Something went wrong when creating your account.' })
        })
    })
})

const login = asyncHandler(async (req, res) => {
    const { errors, valid } = validateLoginForm(req.body)
    if (!valid) {
        return res.status(400).json(errors)
    }

    await User.findOne({ email: req.body.email }).then(async (user) => {
        if (user && (await bcrypt.compare(req.body.password, user.password))) {
            res.status(200).json({ token: generateToken(user._id) })
        } else {
            res.status(400).json({ badCredentials: 'Email or password incorrect' })
        }
    })
})

const getMe = asyncHandler(async (req, res) => {
    await User.findOne({ _id: req.user._id }).then(user => {
        if (user) {
            return res.status(200).json({ user: user })
        }

        res.status(400).json({ error: 'User not exist' })
    })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    })
}

module.exports = {
    register,
    login,
    getMe
}