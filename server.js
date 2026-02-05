require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Import Weather Model
const Weather = require('./models/Weather');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/weather_app';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// ===================== ROUTES =====================

// Home
app.get('/', (req, res) => {
  res.send('🌤️ Weather Backend is Running!');
});

// GET ALL WEATHER
app.get('/api/weather', async (req, res) => {
  try {
    const weatherData = await Weather.find().sort({ createdAt: -1 });
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET WEATHER BY ID
app.get('/api/weather/:id', async (req, res) => {
  try {
    const weather = await Weather.findById(req.params.id);
    if (!weather) {
      return res.status(404).json({ message: 'Weather data not found' });
    }
    res.json(weather);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// CREATE WEATHER
app.post('/api/weather', async (req, res) => {
  try {
    const newWeather = await Weather.create(req.body);
    res.status(201).json(newWeather);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE WEATHER
app.put('/api/weather/:id', async (req, res) => {
  try {
    const updatedWeather = await Weather.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedWeather) {
      return res.status(404).json({ message: 'Weather data not found' });
    }

    res.json(updatedWeather);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE WEATHER
app.delete('/api/weather/:id', async (req, res) => {
  try {
    const deletedWeather = await Weather.findByIdAndDelete(req.params.id);

    if (!deletedWeather) {
      return res.status(404).json({ message: 'Weather data not found' });
    }

    res.json({ message: 'Weather data deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});