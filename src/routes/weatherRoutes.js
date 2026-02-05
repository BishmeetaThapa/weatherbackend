const express = require('express');
const router = express.Router();
const { getWeather, createWeather } = require('../controllers/weatherController');

router.get('/', getWeather);
router.post('/', createWeather);

module.exports = router;
