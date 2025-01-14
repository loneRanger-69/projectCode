import React from "react";
import PropTypes from "prop-types";

export default function FieldTable({ fields, onDetails, onEdit, onDelete }) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="table-auto w-full text-left">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="px-4 py-2">Feldname</th>
                        <th className="px-4 py-2">Größe</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Aktion</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((field) => (
                        <tr key={field.id} className="border-b">
                            {/* Nur Name anzeigen */}
                            <td className="px-4 py-2">{field.name}</td>
                            <td className="px-4 py-2">{field.size} ha</td>
                            <td className={`px-4 py-2 ${field.statusColor}`}>
                                {field.status}
                            </td>
                            <td className="px-4 py-2 flex gap-2">
                                <button
                                    className="bg-green-200 text-green-800 px-3 py-1 rounded"
                                    onClick={() => onDetails(field)}
                                >
                                    Details
                                </button>
                                <button
                                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded"
                                    onClick={() => onEdit(field)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-200 text-red-800 px-3 py-1 rounded"
                                    onClick={() => onDelete(field)}
                                >
                                    Löschen
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

FieldTable.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            size: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
            statusColor: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDetails: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
