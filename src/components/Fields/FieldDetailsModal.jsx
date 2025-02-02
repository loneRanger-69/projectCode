//Code von Victor Bestea - 752622
// Importiere PropTypes zur Typüberprüfung der Props
import PropTypes from "prop-types";

// Definiere die FieldDetailsModal-Komponente, die Details eines Feldes anzeigt
export default function FieldDetailsModal({ field, onClose }) {
    // Wenn kein Feld übergeben wird, gibt die Funktion null zurück und zeigt nichts an
    if (!field) return null;

    return (
        // Overlay für das Modal: Deckt den gesamten Bildschirm mit einem halbtransparenten schwarzen Hintergrund ab
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* Modal-Fenster mit weißem Hintergrund, abgerundeten Ecken und Schatten */}
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                {/* Überschrift des Modals */}
                <h2 className="text-xl font-bold mb-4">Feld-Details</h2>

                {/* Liste der Felddetails */}
                <ul className="space-y-2">
                    <li><strong>Feldname:</strong> {field.name || "N/A"}</li>               {/* Zeigt den Namen des Feldes an */}
                    <li><strong>Größe (ha):</strong> {field.size || "N/A"}</li>            {/* Zeigt die Größe des Feldes in Hektar an */}
                    <li><strong>Status:</strong> {field.status || "N/A"}</li>              {/* Zeigt den aktuellen Status des Feldes an */}
                    <li><strong>Saatgut:</strong> {field.crop || "N/A"}</li>               {/* Zeigt das verwendete Saatgut an */}
                    <li><strong>pH-Wert:</strong> {field.ph_value || "N/A"}</li>          {/* Zeigt den pH-Wert des Bodens an */}
                    <li><strong>Feuchtigkeit:</strong> {field.moisture || "N/A"}</li>     {/* Zeigt den Feuchtigkeitsgehalt des Bodens an */}
                    <li><strong>Nährstoffe (g/m²):</strong> {field.nutrients || "N/A"}</li> {/* Zeigt die Nährstoffkonzentration an */}
                </ul>

                {/* Schließen-Button, um das Modal zu schließen */}
                <div className="mt-4 text-right">
                    <button
                        onClick={onClose} // Ruft die onClose-Funktion auf, wenn der Button geklickt wird
                        className="bg-gray-300 px-4 py-2 rounded text-black hover:bg-gray-400"
                    >
                        Schließen
                    </button>
                </div>
            </div>
        </div>
    );
}

// Definiert die erwarteten Typen der Props für FieldDetailsModal
FieldDetailsModal.propTypes = {
    field: PropTypes.shape({
        name: PropTypes.string,                               // Der Name des Feldes als String
        size: PropTypes.number,                               // Die Größe des Feldes als Zahl
        status: PropTypes.string,                             // Der Status des Feldes als String
        crop: PropTypes.string,                               // Das verwendete Saatgut als String
        ph_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),  // Der pH-Wert kann String oder Zahl sein
        moisture: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),  // Der Feuchtigkeitswert kann String oder Zahl sein
        nutrients: PropTypes.oneOfType([PropTypes.string, PropTypes.number])  // Die Nährstoffwerte können String oder Zahl sein
    }),
    onClose: PropTypes.func.isRequired,                       // onClose ist eine erforderliche Funktion
};
