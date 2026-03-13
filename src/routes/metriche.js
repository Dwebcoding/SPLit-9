const express = require('express');
const { getMetriche } = require('../controllers/metricheController');

const router = express.Router();

router.get('/', getMetriche);

module.exports = router;
