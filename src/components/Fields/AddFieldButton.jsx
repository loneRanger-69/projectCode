import PropTypes from "prop-types";

export default function AddFieldButton({ onAddField }) {
    return (
        <div className="mt-6 flex justify-center">
            <button
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow-md"
                onClick={onAddField}
            >
                Feld hinzufügen
            </button>
        </div>
    );
}

AddFieldButton.propTypes = {
    onAddField: PropTypes.func.isRequired,
};
