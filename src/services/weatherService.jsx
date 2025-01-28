// src/services/weatherService.jsx

import axios from "axios";

// OpenWeatherMap URLs
const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

// Koordinaten für Darmstadt
const DARMSTADT_LAT = 49.8728;
const DARMSTADT_LON = 8.6512;

// API-Key aus der .env-Datei
const API_KEY = import.meta.env.VITE_APP_WEATHERMAP_API_KEY;
console.log("API_KEY aus .env:", API_KEY);

/**
 * Holt das **aktuelle Wetter** (Temperatur, etc.) für Darmstadt von OpenWeatherMap.
 * @returns {Promise<Object>} OpenWeatherMap-Response (aktuelle Wetterdaten)
 * @throws {Error} Wenn API-Key fehlt oder ein Request-Fehler auftritt
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
    return response.data; // JSON-Daten der OpenWeatherMap-API
  } catch (err) {
    console.error("Fehler getDarmstadtWeather:", err);
    throw err;
  }
}

/**
 * Holt die **5-Tage (3-Stunden)** Vorhersage (Temperatur, Wetter) für Darmstadt.
 * @returns {Promise<Object>} OpenWeatherMap-Response (5-Tage Forecast-Daten)
 * @throws {Error} Wenn API-Key fehlt oder ein Request-Fehler auftritt
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

/**
 * Holt die gespeicherten Wetterdaten (z. B. Regenmenge, Regenwahrscheinlichkeit)
 * für jeden Tag aus deiner Datenbank.
 *
 * Erwartet, dass dein Backend diese Route bereitstellt:
 *  GET /weather/weather-data
 *
 * @returns {Promise<Object[]>} Array mit Objekten { date, rain_mm, rain_probability }
 * @throws {Error} Falls der Request fehlschlägt
 */
export async function getWeatherData() {
  try {
    // Passe den Port ggf. an (z. B. 5001)
    const response = await axios.get("http://localhost:5001/weather/weather-data");
    return response.data;
  } catch (err) {
    console.error("Fehler getWeatherData:", err);
    throw err;
  }
}
