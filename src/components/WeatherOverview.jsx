import { useEffect, useState } from "react";
import { getDarmstadtWeather, getWeatherData } from "../services/weatherService";

function WeatherOverview() {
    const [weather, setWeather] = useState({ temperature: null, rainProbability: null });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Hole aktuelle Wetterdaten von OpenWeather (Temperatur) und lokale DB-Werte (Regenwahrscheinlichkeit)
                const [apiWeather, dbData] = await Promise.all([
                    getDarmstadtWeather(),
                    getWeatherData(),
                ]);

                // Heutiges Datum im Format YYYY-MM-DD
                const todayISO = new Date().toISOString().split("T")[0];
                // Passenden Eintrag in dbData suchen, z. B. { date: '2025-01-15', rain_probability: 80, ... }
                const todayEntry = dbData.find((entry) => entry.date === todayISO);

                // Fehlerprüfung: existieren OpenWeather-Daten?
                if (!apiWeather || !apiWeather.main) {
                    throw new Error("Ungültige OpenWeather-Daten.");
                }
                // Fehlerprüfung: existiert ein Eintrag in daily_weather für heute?
                if (!todayEntry) {
                    throw new Error(`Kein Eintrag in daily_weather für ${todayISO}.`);
                }

                // Temperatur aus der OpenWeatherMap-Antwort
                const temperature = Math.round(apiWeather.main.temp);
                // Regenwahrscheinlichkeit aus deiner DB
                const rainProbability = todayEntry.rain_probability;

                setWeather({ temperature, rainProbability });
            } catch (err) {
                console.error("Fehler in WeatherOverview:", err);
                setError("Fehler beim Laden der Wetterdaten.");
            } finally {
                setLoading(false);
            }
        };

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
            <h2 className="text-xl font-bold mb-4">Aktuelles Wetter</h2>
            <p className="text-xl font-bold text-black text">
                Temperatur: <span>{weather.temperature}°C</span>
            </p>
            <p className="text-xl font-bold text-black text">
                Regenwahrscheinlichkeit: <span>{weather.rainProbability}%</span>
            </p>
        </div>
    );
}

export default WeatherOverview;
