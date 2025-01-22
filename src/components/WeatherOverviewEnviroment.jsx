// src/components/WeatherOverviewEnviroment.jsx

import { useEffect, useState } from "react";
import { getDarmstadtWeather } from "../services/weatherService";

export default function WeatherOverviewEnviroment() {
    const [weather, setWeather] = useState({ temperature: null, rainProbability: null });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = "Darmstadt";

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // 1) API-Call -> Temperatur
                const data = await getDarmstadtWeather();

                if (data && data.main && typeof data.main.temp === "number") {
                    // Temperatur runden
                    const temperature = Math.round(data.main.temp);

                    // 2) Regenwahrscheinlichkeit: wir erzeugen zufällig 0..100 %
                    const rainProbability = `${Math.floor(Math.random() * 101)}%`;

                    setWeather({ temperature, rainProbability });
                } else {
                    throw new Error("Ungültige Datenstruktur von der API (Wetter).");
                }
            } catch (err) {
                console.error("Fehler WeatherOverviewEnviroment:", err);
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
            <h2 className="text-xl font-bold mb-4">{location}</h2>
            <p className="text-l text-black">
                Temperatur: <span>{weather.temperature}°C</span>
            </p>
            <p className="text-l text-black">
                Regenwahrscheinlichkeit: <span>{weather.rainProbability}</span>
            </p>
        </div>
    );
}
