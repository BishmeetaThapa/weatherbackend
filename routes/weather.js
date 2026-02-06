import { Router } from "express";
import {
  getWeather,
  getWeatherById,
  createWeather,
  updateWeatherById,
  deleteWeatherById
} from "../controllers/weather.js";

const weatherRouter = Router();

weatherRouter.post("/weather", createWeather);
weatherRouter.get("/weather", getWeather);
weatherRouter.get("/weather/:id", getWeatherById);
weatherRouter.put("/weather/:id", updateWeatherById);
weatherRouter.delete("/weather/:id", deleteWeatherById);

export default weatherRouter;