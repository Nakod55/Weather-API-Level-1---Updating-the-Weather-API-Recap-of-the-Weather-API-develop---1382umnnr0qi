const router = require('express').Router();

router.use('/auth', require('./authRoutes'));

module.exports = router;
