const Joi = require('joi')

module.exports = {
    register: Joi.object().keys({
        username: Joi.string().alphanum().required().min(5).max(30),
        password: Joi.string().required().min(8),
        email: Joi.string().required().email()
    }),
    signIn: Joi.object().keys({
        usernameOrEmail: [
            Joi.string().alphanum().required().min(5).max(30),
            Joi.string().email()
        ],
        password: Joi.string().required().min(8),
    })
}