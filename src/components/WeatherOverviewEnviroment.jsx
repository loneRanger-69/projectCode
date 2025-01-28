// src/components/WeatherOverviewEnviroment.jsx
import { useEffect, useState } from "react";
import { getDarmstadtWeather, getWeatherData } from "../services/weatherService";

export default function WeatherOverviewEnviroment() {
    const [weather, setWeather] = useState({ temperature: null, rainProbability: null });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = "Darmstadt";

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // 1) Aktuelles Wetter von OpenWeather
                // 2) Datenbank-Wetter (z. B. januaryDates etc.)
                const [apiWeather, dbData] = await Promise.all([
                    getDarmstadtWeather(),
                    getWeatherData(),
                ]);

                // Heutiges Datum "YYYY-MM-DD"
                const todayISO = new Date().toISOString().split("T")[0];
                // Passenden Eintrag für heute holen
                const todayEntry = dbData.find((entry) => entry.date === todayISO);

                if (!apiWeather || !apiWeather.main) {
                    throw new Error("Ungültige OpenWeather-Daten");
                }
                if (!todayEntry) {
                    throw new Error(`Kein Eintrag in daily_weather für ${todayISO}`);
                }

                // Temperatur
                const temperature = Math.round(apiWeather.main.temp);
                // Regenwahrscheinlichkeit aus DB
                const rainProbability = todayEntry.rain_probability;

                setWeather({ temperature, rainProbability });
            } catch (err) {
                console.error("Fehler WeatherOverviewEnviroment:", err);
                setError("Fehler beim Laden der Wetterdaten.");
            } finally {
                setLoading(false);
            }
        };

        // fetchWeather aufrufen
        fetchWeather();
    }, []);

    if (loading) {
        return (
            <div className="bg-blue-100 rounded-lg p-6 shadow-md text-center">
                Lädt...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 rounded-lg p-6 shadow-md text-center text-red-700">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-blue-100 rounded-lg p-6 shadow-md text-center">
            <h2 className="text-xl font-bold mb-4">{location}</h2>
            <p className="text-l text-black">
                Temperatur: <span>{weather.temperature}°C</span>
            </p>
            <p className="text-l text-black">
                Regenwahrscheinlichkeit: <span>{weather.rainProbability}%</span>
            </p>
        </div>
    );
}
