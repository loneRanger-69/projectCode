// Importiere PropTypes, um die Typen der Props zu validieren
import PropTypes from "prop-types";

// Definiere die AddFieldButton-Komponente
export default function AddFieldButton({ onAddField }) {
    return (
        <div className="mt-6 flex justify-center"> {/* Äußeres Div mit Margin-Top und zentrierter Ausrichtung */}
            <button
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow-md" // Button-Styling: grauer Hintergrund, abgerundete Ecken, Schatten
                onClick={onAddField} // Ruft die übergebene Funktion auf, wenn der Button geklickt wird
            >
                Feld hinzufügen {/* Beschriftung des Buttons */}
            </button>
        </div>
    );
}

// Validierung der Props: onAddField muss eine Funktion sein und ist erforderlich
AddFieldButton.propTypes = {
    onAddField: PropTypes.func.isRequired,
};
