import express from "express";
import db from "../db.js";
import axios from "axios";

const router = express.Router(); //Code von Muhammad Ilzam Fachreza Sianipar (768835)

// OpenWeatherMap API-Details
const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const DARMSTADT_LAT = 49.8728;
const DARMSTADT_LON = 8.6512;
const API_KEY = process.env.VITE_APP_WEATHERMAP_API_KEY || "8a89e1b64fb101893549ee684e73f02c";

if (!API_KEY) {
    console.error("FEHLER: API_KEY für OpenWeatherMap ist nicht gesetzt. Bitte in der .env-Datei definieren.");
    throw new Error("API_KEY fehlt");
}


/**
 * Route: Wetterdaten aus der Datenbank abrufen
 * GET /weather/weather-data
 */
router.get("/weather-data", async (req, res) => {
    try {
        const data = await db("daily_weather").select("*").orderBy("date");
        res.json(data);
    } catch (err) {
        console.error("Fehler beim Abrufen der Wetterdaten:", err);
        res.status(500).json({ error: "Fehler beim Abrufen der Wetterdaten." });
    }
});

/**
 * Route: Aktuelles Wetter von OpenWeather abrufen
 * GET /weather/current
 */
router.get("/current", async (req, res) => {
    try {
        const params = {
            lat: DARMSTADT_LAT,
            lon: DARMSTADT_LON,
            appid: API_KEY,
            units: "metric", // Temperatur in Celsius
            lang: "de", // Deutsch
        };

        const response = await axios.get(CURRENT_WEATHER_URL, { params });
        res.json(response.data);
    } catch (err) {
        console.error("Fehler beim Abrufen des aktuellen Wetters:", err);
        res.status(500).json({ error: "Fehler beim Abrufen des aktuellen Wetters." });
    }
});

/**
 * Route: 5-Tage-Vorhersage von OpenWeather abrufen
 * GET /weather/forecast
 */
router.get("/forecast", async (req, res) => {
    try {
        const params = {
            lat: DARMSTADT_LAT,
            lon: DARMSTADT_LON,
            appid: API_KEY,
            units: "metric", // Temperatur in Celsius
            lang: "de", // Deutsch
        };

        const response = await axios.get(FORECAST_URL, { params });
        res.json(response.data);
    } catch (err) {
        console.error("Fehler beim Abrufen der Wettervorhersage:", err);
        res.status(500).json({ error: "Fehler beim Abrufen der Wettervorhersage." });
    }
});

// Funktion wird von anderen Services (z. B. Analyse-Service) importiert und verwendet
export async function fetchWeatherDataFromDB() {
    try {
        const data = await db("daily_weather").select("*").orderBy("date");
        return data;
    } catch (err) {
        console.error("Fehler beim Abrufen der Wetterdaten aus der DB:", err);
        throw new Error("Fehler beim Abrufen der Wetterdaten.");
    }
}


export default router;
