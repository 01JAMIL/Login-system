const isEmpty = require('./isEmpty')
const validator = require('validator')

const validateRegisterForm = (data) => {

    let errors = {}

    data.firstName = !isEmpty(data.firstName) ? data.firstName : ''
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    if (validator.isEmpty(data.firstName)) {
        errors.firstNameError = 'First name is required'
    }

    if (validator.isEmpty(data.lastName)) {
        errors.lastNameError = 'Last name is required'
    }

    if (validator.isEmpty(data.email)) {
        errors.emailError = 'Email is required'
    } else if (!validator.isEmail(data.email)) {
        errors.emailError = 'Email format is not valid'
    }

    if (validator.isEmpty(data.password)) {
        errors.passwordError = 'Password is required'
    } else if (data.password.length < 8) {
        errors.passwordError = 'Password must be at least 8 characters'
    }

    return {
        errors,
        valid: isEmpty(errors)
    }
}

const validateLoginForm = (data) => {

    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    if (validator.isEmpty(data.email)) {
        errors.emailError = 'Email is required'
    } else if (!validator.isEmail(data.email)) {
        errors.emailError = 'Email format is not valid'
    }

    if (validator.isEmpty(data.password)) {
        errors.passwordError = 'Password is required'
    }

    return {
        errors,
        valid: isEmpty(errors)
    }
}

module.exports = { validateRegisterForm, validateLoginForm }