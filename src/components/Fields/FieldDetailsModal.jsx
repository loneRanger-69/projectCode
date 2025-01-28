import PropTypes from "prop-types";

export default function FieldDetailsModal({ field, onClose }) {
    // Prüfe, ob `field` definiert ist
    if (!field) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Feld-Details</h2>
                <ul className="space-y-2">
                    <li><strong>Feldname:</strong> {field.name || "N/A"}</li>
                    <li><strong>Größe (ha):</strong> {field.size || "N/A"}</li>
                    <li><strong>Status:</strong> {field.status || "N/A"}</li>
                    <li><strong>Saatgut:</strong> {field.crop || "N/A"}</li>
                    <li><strong>pH-Wert:</strong> {field.ph_value || "N/A"}</li>
                    <li><strong>Feuchtigkeit:</strong> {field.moisture || "N/A"}</li>
                    <li><strong>Nährstoffe (g/m²):</strong> {field.nutrients || "N/A"}</li>
                </ul>
                <div className="mt-4 text-right">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded text-black hover:bg-gray-400"
                    >
                        Schließen
                    </button>
                </div>
            </div>
        </div>
    );
}

FieldDetailsModal.propTypes = {
    field: PropTypes.shape({
        name: PropTypes.string,
        size: PropTypes.number,
        status: PropTypes.string,
        crop: PropTypes.string,
        ph_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        moisture: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        nutrients: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    onClose: PropTypes.func.isRequired,
};
