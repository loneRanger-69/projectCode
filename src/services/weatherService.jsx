// src/services/weatherService.jsx

import axios from "axios";

// Aktuelles Wetter:
const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
// 5-Tage/3h-Vorhersage:
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

const DARMSTADT_LAT = 49.8728;
const DARMSTADT_LON = 8.6512;
const API_KEY = import.meta.env.VITE_APP_WEATHERMAP_API_KEY;

console.log("API_KEY aus .env:", API_KEY);

/**
 * Holt das **aktuelle** Wetter für Darmstadt (nur Temperatur).
 */
export async function getDarmstadtWeather() {
  if (!API_KEY) throw new Error("API_KEY fehlt. Bitte .env checken!");
  try {
    const params = {
      lat: DARMSTADT_LAT,
      lon: DARMSTADT_LON,
      appid: API_KEY,
      units: "metric",
      lang: "de",
    };

    const response = await axios.get(CURRENT_WEATHER_URL, { params });
    return response.data;
  } catch (err) {
    console.error("Fehler getDarmstadtWeather:", err);
    throw err;
  }
}

/**
 * Holt die **5-Tage (3-Stunden)** Vorhersage für Darmstadt (nur Temperatur).
 */
export async function getDarmstadtForecast() {
  if (!API_KEY) throw new Error("API_KEY fehlt. Bitte .env checken!");
  try {
    const params = {
      lat: DARMSTADT_LAT,
      lon: DARMSTADT_LON,
      appid: API_KEY,
      units: "metric",
      lang: "de",
    };

    const response = await axios.get(FORECAST_URL, { params });
    return response.data;
  } catch (err) {
    console.error("Fehler getDarmstadtForecast:", err);
    throw err;
  }
}
