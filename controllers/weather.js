import Weather from "../models/Weather.js";

// CREATE new weather
const createWeather = async (req, res) => {
  await Weather.create(req.body);
  res.send("Weather data created successfully!");
};

// GET all weather
const getWeather = async (req, res) => {
  const data = await Weather.find().sort({ createdAt: -1 });
  res.send(data);
};

// GET weather by ID
const getWeatherById = async (req, res) => {
  const weather = await Weather.findById(req.params.id);
  res.send(weather);
};

// UPDATE weather by ID
const updateWeatherById = async (req, res) => {
  await Weather.findByIdAndUpdate(req.params.id, req.body);
  res.send("Weather data updated successfully!");
};

// DELETE weather by ID
const deleteWeatherById = async (req, res) => {
  await Weather.findByIdAndDelete(req.params.id);
  res.send("Weather data deleted successfully!");
};

export { createWeather, getWeather, getWeatherById, updateWeatherById, deleteWeatherById };