//Dieser Code wurde bearbeitet von Philipp Pister
import PropTypes from "prop-types";

export default function SoilDataTable({ fields, onShowDetails, onStartAnalysis }) {
    return (
        // Tabelle für die Darstellung der Felddaten
        <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
            <thead className="bg-gray-200">
            <tr>
                {/* Spaltenüberschriften */}
                <th className="px-4 py-2">Feldname</th>
                <th className="px-4 py-2">pH-Wert</th>
                <th className="px-4 py-2">Feuchtigkeit</th>
                <th className="px-4 py-2">Nährstoffe (g/m²)</th>
                <th className="px-4 py-2">Aktionen</th>
            </tr>
            </thead>
            <tbody>
            {/* Durchlaufen der Liste aller Felder und Darstellung jeder Zeile */}
            {fields.map((field) => (
                <tr key={field.id} className="border-b">
                    {/* Zellwerte für jedes Feld */}
                    <td className="px-4 py-2">{field.name}</td>
                    <td className="px-4 py-2">{field.ph_value}</td>
                    <td className="px-4 py-2">{field.moisture}</td>
                    <td className="px-4 py-2">{field.nutrients}</td>
                    <td className="px-4 py-2 flex gap-2">
                        {/* Button zum Anzeigen der Felddetails */}
                        <button
                            onClick={() => onShowDetails(field)}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            Details
                        </button>
                        {/* Button zum Starten der Analyse für das Feld */}
                        <button
                            onClick={() => onStartAnalysis(field)}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                            Analyse
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

// PropTypes zur Laufzeitüberprüfung der übergebenen Props
SoilDataTable.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Feld-ID (String oder Zahl)
            name: PropTypes.string, // Name des Feldes
            ph_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // pH-Wert des Bodens
            moisture: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Bodenfeuchtigkeit
            nutrients: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Nährstoffgehalt (g/m²)
        })
    ).isRequired,
    onShowDetails: PropTypes.func.isRequired, // Funktion zum Anzeigen der Details eines Feldes
    onStartAnalysis: PropTypes.func.isRequired, // Funktion zum Starten der Analyse eines Feldes
};
