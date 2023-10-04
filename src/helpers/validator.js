const Joi = require('joi')
const { BadRequestError } = require('../core/ApiError')
const { Types } = require('mongoose')

const validationSource = {
    BODY: 'body',
    HEADER: 'headers',
    QUERY: 'query',
    PARAM: 'params'
};

const validator = (schema, source) => (req, res, next) => {
    try {
        const { error } = schema.validate(req[source]);
        console.info(req[source])
        if (!error) return next();

        const { details } = error;
        const message = details
            .map((i) => i.message.replace(/['"]+/g, ''))
            .join(',');
        next(new BadRequestError({
            message : message
        }));
    } catch (error) {
        next(error);
    }
}

const JoiObjectId = () =>
    Joi.string().custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) return helpers.error('any.invalid');
        return value;
    }, 'Object id Validation')

const JoiUrlEndpoint = () =>
    Joi.string().custom((value, helpers) => {
        if (value.includes('://')) return helpers.error('any.invalid');
        return value;
    }, 'Url Endpoint Validation')

const JoiAuthBearer = () =>
    Joi.string().custom((value, helpers) => {
        if (!value.startWidth('Bearer ')) return helpers.error('any.invalid');
        if (!value.split(' ')[1]) return helpers.error('any.invalid');
        return value;
    }, 'Authorization Header Validation');

module.exports = {
    validator,
    validationSource,
    JoiAuthBearer,
    JoiObjectId,
    JoiUrlEndpoint
}
