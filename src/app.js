const express = require('express')
const env = require('dotenv')
env.config()
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const formData = require("express-form-data")
const os = require("os")
// const initPassport = require('./inits/initPassport')
const routes = require('./routes')
const { NotFoundError } = require('./core/ApiError')

const app = express();

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};

//init middleware
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());
//init database
require('./config/mongodb')
//init Oauth2
// initPassport(app);

app.use('/v1/api', routes);

//error 404
app.use((req, res, next) => next(new NotFoundError({})))

// handle errors
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    console.error(error);
    return res.status(statusCode).json({
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
})

module.exports = app;
