require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/weather', weatherRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Weather Backend API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
