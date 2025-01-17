// Environment.jsx

import ForecastOverview from "../components/Environment/ForecastOverview";
import SoilDataTable from "../components/Environment/SoilDataTable";
import WeatherOverViewEnviroment from "../components/WeatherOverviewEnviroment";

export default function Environment() {
    // Beispielhafte Forecast- und Feld-Daten (Mock-Daten)
    const mockForecastData = [
        { date: "Mo 10.12.", temperature: 12, rainProb: 20 },
        { date: "Di 11.12.", temperature: 10, rainProb: 40 },
        { date: "Mi 12.12.", temperature: 8, rainProb: 50 },
        { date: "Do 13.12.", temperature: 11, rainProb: 30 },
        { date: "Fr 14.12.", temperature: 10, rainProb: 45 },
    ];

    const mockFieldsData = [
        { id: 1, name: "Sojabohnen", ph: 6.3, moisture: 50, nutrients: 14.0 },
        { id: 2, name: "Weizen", ph: 6.8, moisture: 45, nutrients: 12.5 },
        { id: 3, name: "Frühlingszwiebeln", ph: 6.5, moisture: 55, nutrients: 13.2 },
        { id: 4, name: "Mais", ph: 6.2, moisture: 50, nutrients: 14.8 },
    ];

    // Beispiel-Callbacks für Buttons in der Tabelle
    const handleShowDetails = (field) => {
        console.log("Details für Feld:", field);
        // TODO: Modal öffnen o.ä.
    };

    const handleStartAnalysis = (field) => {
        console.log("Analyse für Feld:", field);
        // TODO: Analyse starten (Modal, Popup, etc.)
    };

    return (
        <div className="pt-16 flex flex-col items-start min-h-screen bg-gray-100 px-6">
            {/* Wetterbereich: Weather + Forecast nebeneinander */}
            <div className="flex flex-row w-full max-w-5xl mx-auto gap-4">
                {/* Linke Box: aktuelle Wetterübersicht */}
                <div className="flex-1 bg-blue-50 rounded-md p-4 shadow">
                    <   WeatherOverViewEnviroment
                        
                    />
                </div>

                {/* Rechte Box: 5-Tage-Prognose */}
                <div className="flex-1 bg-blue-50 rounded-md p-4 shadow">
                    <ForecastOverview forecastData={mockForecastData} />
                </div>
            </div>

            {/* Bodendaten-Tabelle */}
            <div className="w-full max-w-5xl mx-auto mt-6 bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Bodendaten pro Feld</h2>
                <SoilDataTable
                    fields={mockFieldsData}
                    onShowDetails={handleShowDetails}
                    onStartAnalysis={handleStartAnalysis}
                />
            </div>

            {/* Platzhalter für Diagramme oder andere Bereiche */}
            <div className="w-full max-w-5xl mx-auto mt-8 bg-white p-4 rounded shadow">
                <h2 className="text-lg font-bold mb-2">Diagramme oder zusätzliche Infos</h2>
                <p className="text-sm text-gray-600">
                    Hier ist ein Platzhalter für z. B. pH-Verlauf, Feuchtigkeitsverlauf, etc. sobald ein Feld ausgewählt ist.
                </p>
            </div>
        </div>
    );
}
