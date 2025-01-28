// src/components/Fields/AnalysisModal.jsx

import PropTypes from "prop-types";

export default function AnalysisModal({ field, onClose }) {
    if (!field) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Analyse für {field.name}</h2>
                <ul className="space-y-2">
                    <li><strong>Empfohlene Bewässerung:</strong> {field.waterMessage || "N/A"}</li>
                    <li><strong>Nährstoffanalyse:</strong> {field.nutrientMessage || "N/A"}</li>
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

AnalysisModal.propTypes = {
    field: PropTypes.shape({
        name: PropTypes.string,
        waterMessage: PropTypes.string,
        rainProbability: PropTypes.string,
        temperature: PropTypes.string,
        nutrientMessage: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
};
