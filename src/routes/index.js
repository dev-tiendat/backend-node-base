const express = require('express')
const accessRouter = require('./access')

const router = express.Router();

router.use('/auth', accessRouter);

module.exports = router;