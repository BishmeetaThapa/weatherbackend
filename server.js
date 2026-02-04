require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Model
const Weather = require('./models/Weather');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/weather_app';

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes

// Get All Weather
app.get('/api/weather', async (req, res) => {
    try {
        const weatherData = await Weather.find().sort({ createdAt: -1 });
        res.json(weatherData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create Weather
app.get('/api/weather/create', async (req, res) => {
    // Just a test route to easily add data via browser if needed, 
    // ideally use POST for real apps
    try {
        const sample = {
            city: 'London',
            country: 'UK',
            coordinates: { lon: -0.12, lat: 51.50 },
            weather: [{ id: 300, main: 'Drizzle', description: 'light intensity drizzle', icon: '09d' }],
            base: 'stations',
            main: { temp: 280.32, pressure: 1012, humidity: 81, temp_min: 279.15, temp_max: 281.15 },
            visibility: 10000,
            wind: { speed: 4.1, deg: 80 },
            dt: 1485789600,
            sys: { type: 1, id: 5091, message: 0.0103, country: 'GB', sunrise: 1485762037, sunset: 1485794875 },
            timezone: 0,
            id: 2643743,
            name: 'London',
            cod: 200
        };
        const newWeather = await Weather.create(sample);
        res.json(newWeather);
    } catch (err) {
        res.json({ error: err.message });
    }
});

app.post('/api/weather', async (req, res) => {
    try {
        const newWeather = await Weather.create(req.body);
        res.status(201).json(newWeather);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.get('/', (req, res) => {
    res.send('Weather Backend is Running!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
