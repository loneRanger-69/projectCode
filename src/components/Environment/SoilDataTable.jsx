import PropTypes from 'prop-types';

export default function SoilDataTable({ fields, onShowDetails, onStartAnalysis }) {
    return (
        <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
            <thead className="bg-gray-200">
            <tr>
                <th className="px-4 py-2">Feldname</th>
                <th className="px-4 py-2">pH-Wert</th>
                <th className="px-4 py-2">Feuchtigkeit</th>
                <th className="px-4 py-2">Nährstoffe (g/m²)</th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
            </tr>
            </thead>
            <tbody>
            {fields.map((field) => (
                <tr key={field.id} className="border-b">
                    <td className="px-4 py-2">{field.name}</td>
                    <td className="px-4 py-2">{field.ph_value}</td>
                    <td className="px-4 py-2">{field.moisture}</td>
                    <td className="px-4 py-2">{field.nutrients}</td>
                    <td className="px-4 py-2">
                        <button
                            onClick={() => onShowDetails(field)}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            Details
                        </button>
                    </td>
                    <td className="px-4 py-2">
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

SoilDataTable.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            name: PropTypes.string,
            ph_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            moisture: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            nutrients: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ).isRequired,
    onShowDetails: PropTypes.func.isRequired,
    onStartAnalysis: PropTypes.func.isRequired,
};
