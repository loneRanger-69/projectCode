//Dieser Code wurde bearbeitet von Philipp Pister

import db from "../db.js";

async function populateWeatherData() {
    const januaryDates = Array.from({ length: 31 }, (_, i) => `2025-01-${String(i + 1).padStart(2, '0')}`);
    const februaryDates = Array.from({ length: 28 }, (_, i) => `2025-02-${String(i + 1).padStart(2, '0')}`);

    const allDates = [...januaryDates, ...februaryDates];

    try {
        for (const date of allDates) {
            const rain_mm = Math.random() * 10; // Zufällige Regenmenge zwischen 0 und 10 mm
            const rain_probability = Math.floor(Math.random() * 101); // Zufällige Wahrscheinlichkeit (0–100%)

            await db("daily_weather").insert({
                date,
                rain_mm: rain_mm.toFixed(1),
                rain_probability,
            });
        }
        console.log("Daten für Januar und Februar erfolgreich eingetragen.");
    } catch (err) {
        console.error("Fehler beim Eintragen der Wetterdaten:", err);
    }
}

populateWeatherData();
