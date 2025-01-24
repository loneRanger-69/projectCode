// src/components/FieldOverview.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FieldOverview() {
    const [fields, setFields] = useState([]); // Lokaler State für Felder
    const [isLoading, setIsLoading] = useState(true); // Ladezustand
    const [error, setError] = useState(null); // Fehlerzustand

    // Funktion zum Abrufen der Felder von der API
    const fetchFields = async () => {
        setIsLoading(true); // Ladezustand aktivieren
        setError(null); // Fehler zurücksetzen
        try {
            const response = await axios.get("http://localhost:5001/fields");
            setFields(response.data); // Felder setzen
        } catch (err) {
            console.error("Fehler beim Abrufen der Felder:", err);
            setError("Fehler beim Abrufen der Felder.");
        } finally {
            setIsLoading(false); // Ladezustand deaktivieren
        }
    };

    // useEffect zum Abrufen der Felder beim Laden der Komponente
    useEffect(() => {
        fetchFields();
    }, []);

    return (
        <div className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-2">Feldübersicht</h2>

            {/* Ladeanzeige */}
            {isLoading ? (
                <div className="text-center text-gray-500">Lade Felder...</div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (
                <table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th className="text-left">Feldname</th>
                            <th className="text-left">Größe</th>
                            <th className="text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.length > 0 ? (
                            fields.map((field) => (
                                <tr key={field.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2">{field.name}</td>
                                    <td className="py-2">{field.size}</td>
                                    <td className="py-2">{field.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-4 text-gray-500">
                                    Keine Felder gefunden.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}