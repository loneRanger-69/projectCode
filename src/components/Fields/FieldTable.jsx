// Importiere PropTypes zur Validierung der Props
import PropTypes from "prop-types";

// Definiere die FieldTable-Komponente, die eine Tabelle mit Felddaten anzeigt
export default function FieldTable({ fields, onDetails, onEdit, onDelete }) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Tabelle mit automatischer Breite und linksbündigem Text */}
            <table className="table-auto w-full text-left">
                <thead className="bg-gray-200 text-gray-700">
                    {/* Tabellenkopf mit Spaltenüberschriften */}
                    <tr>
                        <th className="px-4 py-2">Feldname</th>          {/* Spalte für den Namen des Feldes */}
                        <th className="px-4 py-2">Größe (ha)</th>        {/* Spalte für die Feldgröße in Hektar */}
                        <th className="px-4 py-2">zu erledigen</th>      {/* Spalte für den Status des Feldes */}
                        <th className="px-4 py-2">Aktionen</th>         {/* Spalte für Aktions-Buttons */}
                    </tr>
                </thead>
                <tbody>
                    {/* Überprüft, ob Felder vorhanden sind */}
                    {fields.length > 0 ? (
                        fields.map((field) => (
                            <tr key={field.id} className="border-b hover:bg-gray-100">
                                {/* Zeigt den Namen des Feldes an */}
                                <td className="px-4 py-2">{field.name}</td>

                                {/* Zeigt die Größe des Feldes an */}
                                <td className="px-4 py-2">{field.size}</td>

                                {/* Zeigt den Status des Feldes an */}
                                <td className="px-4 py-2">{field.status}</td>

                                {/* Aktions-Buttons: Details, Edit, Löschen */}
                                <td className="px-4 py-2 flex gap-2">
                                    {/* Button zum Anzeigen der Felddetails */}
                                    <button
                                        className="bg-green-200 text-green-800 px-3 py-1 rounded hover:bg-green-300"
                                        onClick={() => onDetails(field)} // Übergibt das gesamte Feld an die onDetails-Funktion
                                    >
                                        Details
                                    </button>

                                    {/* Button zum Bearbeiten des Feldes */}
                                    <button
                                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
                                        onClick={() => onEdit(field)} // Übergibt das Feld an die onEdit-Funktion
                                    >
                                        Edit
                                    </button>

                                    {/* Button zum Löschen des Feldes */}
                                    <button
                                        className="bg-red-200 text-red-800 px-3 py-1 rounded hover:bg-red-300"
                                        onClick={() => onDelete(field.id)} // Übergibt die ID des Feldes an die onDelete-Funktion
                                    >
                                        Löschen
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        // Anzeige, wenn keine Felder gefunden wurden
                        <tr>
                            <td colSpan="4" className="text-center px-4 py-4 text-gray-500">
                                Keine Felder gefunden.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

// Definiert die erwarteten Props und ihre Typen für die FieldTable-Komponente
FieldTable.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,   // Die ID des Feldes muss eine Zahl sein
            name: PropTypes.string.isRequired, // Der Name des Feldes muss ein String sein
            size: PropTypes.number.isRequired, // Die Größe des Feldes muss eine Zahl sein
            status: PropTypes.string.isRequired, // Der Status des Feldes muss ein String sein
        })
    ).isRequired,
    onDetails: PropTypes.func.isRequired,  // Funktion, die beim Anzeigen von Details aufgerufen wird
    onEdit: PropTypes.func.isRequired,     // Funktion, die beim Bearbeiten aufgerufen wird
    onDelete: PropTypes.func.isRequired,   // Funktion, die beim Löschen aufgerufen wird
};
