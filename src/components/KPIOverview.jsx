// src/components/KPIOverview.jsx
//Code von Muhammad Ilzam Fachreza Sianipar (768835)
import React, { useState, useEffect } from "react";
import axios from "axios";

function KPIOverview() {
    // Lokaler State für KPI-Werte
    const [kpis, setKpis] = useState({
        totalFields: 0,
        plantedFields: 0,
        harvestedFields: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchKpis();
    }, []);

    async function fetchKpis() {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:5001/kpis");
            setKpis(response.data);
        } catch (err) {
            console.error("Fehler beim Abrufen der KPIs:", err);
            setError("Fehler beim Laden der KPI-Daten.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-2">Betriebsauslastung (KPIs)</h2>

            {isLoading ? (
                <p className="text-gray-500">Lade KPI-Daten...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <p>
                        Gesamtfelder:{" "}
                        <span className="font-medium">{kpis.totalFields}</span>
                    </p>
                    <p>
                        Bepflanzte Felder:{" "}
                        <span className="font-medium">{kpis.plantedFields}</span>
                    </p>
                    <p>
                        Geerntete Felder:{" "}
                        <span className="font-medium">{kpis.harvestedFields}</span>
                    </p>
                </>
            )}
        </div>
    );
}

export default KPIOverview;