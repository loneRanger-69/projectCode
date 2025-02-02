// Importiere PropTypes zur Validierung der Props und useState für den lokalen Zustand
import PropTypes from "prop-types";
import { useState } from "react";

// Definiere die FieldSearchAndFilter-Komponente, die Such- und Filteroptionen für Felder bereitstellt
export default function FieldSearchAndFilter({ onSearch, onFilterStatus, onFilterSize }) {
    // Zustand für die Sichtbarkeit des Status-Dropdowns
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    // Zustand für die Sichtbarkeit des Größen-Dropdowns
    const [isSizeOpen, setIsSizeOpen] = useState(false);

    return (
        <div className="flex flex-wrap gap-4 items-center">
            {/* Suchfeld für die Eingabe eines Feldnamens */}
            <input
                type="text"
                placeholder="Geben Sie hier das gesuchte Feld an"
                onChange={(e) => onSearch(e.target.value)} // Ruft die onSearch-Funktion mit dem Eingabewert auf
                className="border border-gray-300 rounded px-4 py-2 bg-white text-black flex-grow"
            />

            {/* Status Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setIsStatusOpen((prev) => !prev)} // Öffnet/Schließt das Dropdown bei Klick
                    className="bg-white text-black border border-gray-300 rounded px-4 py-2"
                >
                    zu erledigen ▼ {/* Beschriftung des Buttons */}
                </button>

                {/* Dropdown-Menü für den Statusfilter */}
                {isStatusOpen && (
                    <div className="absolute bg-white text-black shadow-lg rounded mt-2 z-10">
                        {/* Neue Status-Optionen */}
                        <button
                            onClick={() => {
                                onFilterStatus("Bepflanzt"); // Filtert nach 'Bepflanzt'
                                setIsStatusOpen(false); // Schließt das Dropdown
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Bepflanzt
                        </button>
                        <button
                            onClick={() => {
                                onFilterStatus("Brachliegend"); // Filtert nach 'Brachliegend'
                                setIsStatusOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Brachliegend
                        </button>
                        <button
                            onClick={() => {
                                onFilterStatus("Ernte"); // Filtert nach 'Ernte'
                                setIsStatusOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Ernte
                        </button>
                        <button
                            onClick={() => {
                                onFilterStatus("Wachstum"); // Filtert nach 'Wachstum'
                                setIsStatusOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Wachstum
                        </button>
                        <button
                            onClick={() => {
                                onFilterStatus("Aussaat"); // Filtert nach 'Aussaat'
                                setIsStatusOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Aussaat
                        </button>

                        {/* Ältere Status-Optionen */}
                        <button
                            onClick={() => {
                                onFilterStatus("Bewässerung"); // Filtert nach 'Bewässerung'
                                setIsStatusOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Bewässerung
                        </button>
                        <button
                            onClick={() => {
                                onFilterStatus("Düngung"); // Filtert nach 'Düngung'
                                setIsStatusOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Düngung
                        </button>
                        <button
                            onClick={() => {
                                onFilterStatus("Pflanzenschutz"); // Filtert nach 'Pflanzenschutz'
                                setIsStatusOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Pflanzenschutz
                        </button>
                    </div>
                )}
            </div>

            {/* Größe Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setIsSizeOpen((prev) => !prev)} // Öffnet/Schließt das Dropdown bei Klick
                    className="bg-white text-black border border-gray-300 rounded px-4 py-2"
                >
                    Größe ▼ {/* Beschriftung des Buttons */}
                </button>

                {/* Dropdown-Menü für die Größenfilter */}
                {isSizeOpen && (
                    <div className="absolute bg-white text-black shadow-lg rounded mt-2 z-10">
                        <button
                            onClick={() => {
                                onFilterSize("<30 Hektar"); // Filtert nach Feldern kleiner als 30 Hektar
                                setIsSizeOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            &lt; 30 Hektar
                        </button>
                        <button
                            onClick={() => {
                                onFilterSize("30-100 Hektar"); // Filtert nach Feldern zwischen 30 und 100 Hektar
                                setIsSizeOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            30-100 Hektar
                        </button>
                        <button
                            onClick={() => {
                                onFilterSize(">100 Hektar"); // Filtert nach Feldern größer als 100 Hektar
                                setIsSizeOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            &gt; 100 Hektar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// PropTypes zur Validierung der übergebenen Funktionen
FieldSearchAndFilter.propTypes = {
    onSearch: PropTypes.func.isRequired,        // Funktion zur Verarbeitung von Suchanfragen (erforderlich)
    onFilterStatus: PropTypes.func.isRequired,  // Funktion zur Filterung nach Status (erforderlich)
    onFilterSize: PropTypes.func.isRequired,    // Funktion zur Filterung nach Größe (erforderlich)
};
