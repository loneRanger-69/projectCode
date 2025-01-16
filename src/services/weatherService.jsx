// src/services/weatherService.jsx

import axios from 'axios';

const WEATHERMAP_URL = 'https://api.openweathermap.org/data/2.5/weather';
const DARMSTADT_LAT = 49.8728;
const DARMSTADT_LON = 8.6512;
const API_KEY = import.meta.env.VITE_APP_WEATHERMAP_API_KEY; // API-Schlüssel aus .env

// Debugging: Überprüfe den API_KEY
console.log("API_KEY aus .env:", API_KEY);

export async function getDarmstadtWeather() {
  if (!API_KEY) {
    throw new Error("API_KEY ist nicht definiert. Überprüfe deine .env-Datei.");
  }

  try {
    const params = {
      lat: DARMSTADT_LAT,
      lon: DARMSTADT_LON,
      appid: API_KEY,
      units: 'metric',
      lang: 'de',
    };

    console.log("API-Anfrage mit Parametern:", params);

    const response = await axios.get(WEATHERMAP_URL, { params });
    console.log("API-Antwort:", response.data); // Debugging

    return response.data;
  } catch (error) {
    if (error.response) {
      // Server hat mit einem Statuscode geantwortet, der außerhalb des 2xx Bereichs liegt
      console.error("API-Antwort Fehler:", error.response.data);
    } else if (error.request) {
      // Anfrage wurde gemacht, aber keine Antwort erhalten
      console.error("Keine Antwort von der API erhalten:", error.request);
    } else {
      // Fehler bei der Einrichtung der Anfrage
      console.error("Fehler bei der Anfrage:", error.message);
    }
    throw error;
  }
}