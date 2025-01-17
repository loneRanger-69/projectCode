// src/components/WeatherOverviewEnviroment.jsx

import  { useEffect, useState } from 'react';
import { getDarmstadtWeather } from "../services/weatherService";

export default function WeatherOverviewEnviroment() {
    const [weather, setWeather] = useState({ temperature: null, rainProbability: null });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Hardcodierter Standort
    const location = 'Darmstadt';

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await getDarmstadtWeather();

                // Überprüfe die Struktur der API-Antwort
                if (data && data.main && typeof data.main.temp === 'number') {
                    // Temperatur aufrunden
                    const temperature = Math.round(data.main.temp);

                    // Regenwahrscheinlichkeit berechnen
                    let rainProbability = "0%";
                    if (data.rain && data.rain['1h']) {
                        // Wenn es in der letzten Stunde geregnet hat, berechnen wir eine Wahrscheinlichkeit
                        // Basierend auf einer vereinfachten Umrechnung: 10 mm entsprechen etwa 100% Wahrscheinlichkeit
                        rainProbability = `${Math.min(Math.round(data.rain['1h'] * 10), 100)}%`;
                    } else if (data.weather && data.weather.length > 0) {
                        // Wenn keine Regenmenge angegeben ist, beurteilen wir die Wahrscheinlichkeit anhand der Wetterbedingungen
                        const weatherCondition = data.weather[0].main.toLowerCase();
                        if (weatherCondition.includes("rain")) {
                            rainProbability = "80%"; // Beispielwert für regnerische Bedingungen
                        } else if (weatherCondition.includes("drizzle")) {
                            rainProbability = "60%"; // Beispielwert für Nieselregen
                        } else if (weatherCondition.includes("clouds")) {
                            rainProbability = "30%"; // Beispielwert für bewölkte Bedingungen
                        }
                    }

                    setWeather({ temperature, rainProbability });
                } else {
                    throw new Error("Ungültige Datenstruktur von der API.");
                }
            } catch (err) {
                console.error("Fehler beim Laden der Wetterdaten in WeatherOverviewEnviroment:", err);
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
            <h2 className="text-xl font-bold mb-4"> {location}</h2>
            <p className="text-l font text-black">
                Temperatur: <span>{weather.temperature}°C</span>
            </p>
            <p className="text-l font text-black">
                Regenwahrscheinlichkeit: <span>{weather.rainProbability}</span>
            </p>
        </div>
    );
}