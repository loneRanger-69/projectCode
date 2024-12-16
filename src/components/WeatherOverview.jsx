import { useState, useEffect } from "react";

function WeatherOverview() {
    const [weather, setWeather] = useState({ temperature: 20, rainProbability: "30%" });

    useEffect(() => {
        // Simulierter API-Aufruf
        const fetchWeather = async () => {
            setWeather({ temperature: 22, rainProbability: "40%" });
        };
        fetchWeather();
    }, []);

    return (
        <div className="bg-blue-100 rounded-lg p-6 shadow-md text-center">
            <h2 className="text-xl font-bold mb-4">Aktuelles Wetter</h2>
            <p className="text-2xl font-bold text-white text-shadow">
                Temperatur: <span>{weather.temperature}°C</span>
            </p>
            <p className="text-2xl font-bold text-white text-shadow">
                Regenwahrscheinlichkeit: <span>{weather.rainProbability}</span>
            </p>
        </div>
    );
}

export default WeatherOverview;
