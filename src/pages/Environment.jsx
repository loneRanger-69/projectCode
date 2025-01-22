// src/pages/Environment.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import ForecastOverview from "../components/Environment/ForecastOverview";
import SoilDataTable from "../components/Environment/SoilDataTable";
import WeatherOverviewEnviroment from "../components/WeatherOverviewEnviroment";
import FieldDetailsModal from "../components/Fields/FieldDetailsModal";
import { getDarmstadtForecast } from "../services/weatherService";

export default function Environment() {
    // Felder
    const [fields, setFields] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Details-Modal
    const [detailsField, setDetailsField] = useState(null);

    // Forecast
    const [forecastData, setForecastData] = useState(null);
    const [forecastError, setForecastError] = useState(null);

    useEffect(() => {
        fetchFields();
        fetchForecast();
    }, []);

    // 1) Felder aus Backend
    const fetchFields = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:5000/fields");
            setFields(response.data);
        } catch (err) {
            console.error("Fehler beim Abrufen der Felder:", err);
            setError("Fehler beim Abrufen der Felder.");
        } finally {
            setIsLoading(false);
        }
    };

    // 2) Forecast: (Aktuelles Weather + 5-Tage, je nach implementierung)
    const fetchForecast = async () => {
        try {
            const data = await getDarmstadtForecast();
            // data.list => ~40 Einträge à 3h => wir filtern 1 Eintrag pro Tag
            const dailyEntries = data.list.filter((_, idx) => idx % 8 === 0);

            // Regenwahrscheinlichkeit random (NUR für Forecast-Demo):
            const transformed = dailyEntries.map((item) => {
                const randomRain = Math.floor(Math.random() * 101);
                return {
                    date: new Date(item.dt_txt).toLocaleDateString("de-DE", {
                        weekday: "short",
                        day: "numeric",
                        month: "numeric",
                    }),
                    temperature: Math.round(item.main.temp),
                    rainProb: randomRain,
                };
            });
            setForecastData(transformed);
        } catch (err) {
            console.error("Fehler beim Laden der Forecast-Daten:", err);
            setForecastError("Konnte die 5-Tage-Vorhersage nicht abrufen.");
        }
    };

    // 3) Button zum Simulieren von Felddaten
    const handleSimulateData = async () => {
        try {
            // POST /fields/simulate => Erzeugt neue random Felddaten in DB
            await axios.post("http://localhost:5000/fields/simulate");
            // Danach neu laden
            await fetchFields();
        } catch (simulateErr) {
            console.error("Fehler beim Simulieren der Daten:", simulateErr);
            setError("Fehler beim Simulieren der Sensordaten.");
        }
    };

    // Aktionen in der Tabelle
    const handleShowDetails = (field) => {
        setDetailsField(field);
    };

    const handleStartAnalysis = (field) => {
        console.log("Analyse starten für Feld:", field);
    };

    return (
        <div className="pt-16 flex flex-col items-start min-h-screen bg-gray-100 px-6">
            {/* 1) Wetterbereich */}
            <div className="flex flex-row w-full max-w-5xl mx-auto gap-4">
                {/* Links: aktuelles Wetter */}
                <div className="flex-1 bg-blue-50 rounded-md p-4 shadow">
                    <WeatherOverviewEnviroment />
                </div>

                {/* Rechts: 5-Tage-Prognose */}
                <div className="flex-1 bg-blue-50 rounded-md p-4 shadow">
                    {forecastError && (
                        <div className="text-red-500 mb-2">{forecastError}</div>
                    )}
                    <ForecastOverview forecastData={forecastData} />
                </div>
            </div>

            {/* 2) Bodendaten-Tabelle */}
            <div className="w-full max-w-5xl mx-auto mt-6 bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Bodendaten pro Feld</h2>
                {error && <div className="text-red-500 mb-2">{error}</div>}

                {isLoading ? (
                    <p>Lade Felder...</p>
                ) : (
                    <SoilDataTable
                        fields={fields}
                        onShowDetails={handleShowDetails}
                        onStartAnalysis={handleStartAnalysis}
                    />
                )}

                {/* Button: Neue Zufalls-Sensordaten */}
                <div className="mt-4">
                    <button
                        onClick={handleSimulateData}
                        className="bg-orange-500 text-white px-4 py-2 rounded"
                    >
                        Sensordaten abfragen
                    </button>
                </div>
            </div>

            {/* 3) Platz für Diagramme o.Ä. */}
            <div className="w-full max-w-5xl mx-auto mt-8 bg-white p-4 rounded shadow">
                <h2 className="text-lg font-bold mb-2">Diagramme oder zusätzliche Infos</h2>
                <p className="text-sm text-gray-600">
                    Hier kannst du pH-Verlauf, Feuchtigkeitsverlauf etc. anzeigen.
                </p>
            </div>

            {/* 4) Modal: Feld-Details */}
            {detailsField && (
                <FieldDetailsModal
                    field={detailsField}
                    onClose={() => setDetailsField(null)}
                />
            )}
        </div>
    );
}
