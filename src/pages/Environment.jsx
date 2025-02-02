// src/pages/Environment.jsx || Diese Seite wurde bearbeitet von Philipp Pister

import { useState, useEffect } from "react";
import axios from "axios";
import ForecastOverview from "../components/Environment/ForecastOverview";
import SoilDataTable from "../components/Environment/SoilDataTable";
import WeatherOverviewEnviroment from "../components/WeatherOverviewEnviroment";
import FieldDetailsModal from "../components/Fields/FieldDetailsModal";
import AnalysisModal from "../components/Fields/AnalysisModal.jsx"; // Neues Modal für Analyse
import PhChart from "../components/Environment/PHChart.jsx"; // PhChart hinzufügen
import { getDarmstadtForecast } from "../services/weatherService";
import { getWeatherData } from "../services/weatherService";
import { fetchPhHistory, simulatePhData } from "../services/phService"; // Importiere Simulationsfunktion

export default function Environment() {
    const [fields, setFields] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [detailsField, setDetailsField] = useState(null); // Details
    const [analysisField, setAnalysisField] = useState(null); // Analyse
    const [phData, setPhData] = useState([]); // pH-Daten für das Diagramm
    const [selectedFieldId, setSelectedFieldId] = useState(null); // Feld für pH-Diagramm

    const [forecastData, setForecastData] = useState(null);
    const [forecastError, setForecastError] = useState(null);

    useEffect(() => {
        fetchFields();
        fetchForecast();
    }, []);

    // Felder aus dem Backend abrufen
    const fetchFields = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:5001/fields");
            setFields(response.data);
        } catch (err) {
            console.error("Fehler beim Abrufen der Felder:", err);
            setError("Fehler beim Abrufen der Felder.");
        } finally {
            setIsLoading(false);
        }
    };

    // Wettervorhersage abrufen
    const fetchForecast = async () => {
        try {
            const [apiData, dbData] = await Promise.all([
                getDarmstadtForecast(),
                getWeatherData(),
            ]);

            if (!apiData || !apiData.list) {
                throw new Error("Ungültige Datenstruktur von OpenWeather.");
            }

            const dailyEntries = apiData.list.filter((_, idx) => idx % 8 === 0);
            const transformed = dailyEntries.map((item) => {
                const dateString = item.dt_txt.split(" ")[0];
                const dbEntry = dbData.find((entry) => entry.date === dateString);

                return {
                    date: new Date(item.dt_txt).toLocaleDateString("de-DE", {
                        weekday: "short",
                        day: "numeric",
                        month: "numeric",
                    }),
                    temperature: Math.round(item.main.temp),
                    rainProb: dbEntry ? dbEntry.rain_probability : "N/A",
                };
            });

            setForecastData(transformed);
        } catch (err) {
            console.error("Fehler beim Laden der Forecast-Daten:", err);
            setForecastError("Konnte die 5-Tage-Vorhersage nicht abrufen.");
        }
    };

    // Analyse starten
    const handleStartAnalysis = async (field) => {
        try {
            const nutrientResponse = await axios.get(
                `http://localhost:5001/analysis/${field.id}/optimize-nutrients`
            );
            const nutrientMessage =
                nutrientResponse.data.message || "Keine spezifischen Empfehlungen verfügbar.";

            const waterResponse = await axios.get(
                `http://localhost:5001/analysis/${field.id}/water-consumption`
            );
            const waterData = waterResponse.data;

            setAnalysisField({
                ...field,
                nutrientMessage,
                waterMessage: `Empfohlene Bewässerung: ${waterData.totalWaterNeed.toFixed(1)} Liter/Tag`,
                rainProbability: `${waterData.rainProbability}%`,
                temperature: `${waterData.temperature}°C`,
            });
        } catch (err) {
            console.error("Fehler bei der Analyse:", err);
            alert("Es ist ein Fehler bei der Analyse aufgetreten.");
        }
    };

    // Details anzeigen
    const handleShowDetails = (field) => {
        setDetailsField(field);
    };

    // pH-Verlauf abrufen
    const fetchPhHistoryData = async (fieldId) => {
        try {
            const data = await fetchPhHistory(fieldId);
            setPhData(data);
            setSelectedFieldId(fieldId);
        } catch (err) {
            console.error("Fehler beim Abrufen der pH-Daten:", err);
        }
    };

    // pH-Daten simulieren und aktualisieren
    const handleSimulatePhData = async () => {
        try {
            if (!selectedFieldId) {
                alert("Bitte wählen Sie ein Feld aus, um die pH-Daten zu simulieren.");
                return;
            }
            await simulatePhData(selectedFieldId); // Simulieren der pH-Daten
            fetchPhHistoryData(selectedFieldId); // Aktualisieren der pH-Daten
        } catch (err) {
            console.error("Fehler beim Simulieren der pH-Daten:", err);
            alert("Fehler beim Simulieren der pH-Daten.");
        }
    };

    // Sensordaten aktualisieren
    const handleSimulateData = async () => {
        try {
            await axios.post("http://localhost:5001/fields/simulate");
            await fetchFields();
        } catch (simulateErr) {
            console.error("Fehler beim Simulieren der Sensordaten:", simulateErr);
            alert("Fehler beim Simulieren der Sensordaten.");
        }
    };

    // Dropdown-Auswahl für pH-Diagramm
    const handleFieldChange = (fieldId) => {
        setSelectedFieldId(fieldId);
        fetchPhHistoryData(fieldId);
    };

    return (
        <div className="pt-16 flex flex-col items-start min-h-screen bg-gray-100 px-6">
            {/* Wetterbereich */}
            <div className="flex flex-row w-full max-w-5xl mx-auto gap-4">
                <div className="flex-1 bg-blue-50 rounded-md p-4 shadow">
                    <WeatherOverviewEnviroment />
                </div>
                <div className="flex-1 bg-blue-50 rounded-md p-4 shadow">
                    {forecastError && <div className="text-red-500 mb-2">{forecastError}</div>}
                    <ForecastOverview forecastData={forecastData} />
                </div>
            </div>

            {/* Tabelle mit Felddaten */}
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

                {/* Button zum Simulieren von Sensordaten */}
                <div className="mt-4">
                    <button
                        onClick={handleSimulateData}
                        className="bg-orange-500 text-white px-4 py-2 rounded"
                    >
                        Sensordaten aktualisieren
                    </button>
                </div>
            </div>

            {/* Modal: Feld-Details */}
            {detailsField && (
                <FieldDetailsModal
                    field={detailsField}
                    onClose={() => setDetailsField(null)}
                />
            )}

            {/* Modal: Analyse */}
            {analysisField && (
                <AnalysisModal
                    field={analysisField}
                    onClose={() => setAnalysisField(null)}
                />
            )}

            {/* pH-Verlauf */}
            <div className="w-full max-w-5xl mx-auto mt-8 bg-white p-4 rounded shadow">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">pH-Verlauf</h2>
                    <select
                        className="border rounded px-4 py-2 bg-white text-black" // Weißer Hintergrund, schwarze Schrift
                        value={selectedFieldId || ""}
                        onChange={(e) => handleFieldChange(e.target.value)}
                    >
                        <option value="" disabled>
                            Feld auswählen
                        </option>
                        {fields.map((field) => (
                            <option key={field.id} value={field.id}>
                                {field.name}
                            </option>
                        ))}
                    </select>
                </div>
                {phData.length > 0 ? (
                    <PhChart phData={phData} />
                ) : (
                    <p className="text-black">Wählen Sie ein Feld, um den pH-Verlauf anzuzeigen.</p> // Hinweistext in Schwarz
                )}
                <button
                    onClick={handleSimulatePhData}
                    className="mt-4 bg-orange-500 text-white px-4 py-2 rounded"
                >
                    pH-Daten simulieren
                </button>
            </div>

        </div>
    );
}
