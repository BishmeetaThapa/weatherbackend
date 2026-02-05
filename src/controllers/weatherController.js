const Weather = require('../models/Weather');

// @desc    Get all weather data
// @route   GET /api/weather
// @access  Public
const getWeather = async (req, res) => {
    try {
        const weatherData = await Weather.find().sort({ createdAt: -1 });
        res.status(200).json(weatherData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add new weather data
// @route   POST /api/weather
// @access  Public
const createWeather = async (req, res) => {
    try {
        const newWeather = await Weather.create(req.body);
        res.status(201).json(newWeather);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getWeather,
    createWeather
};
