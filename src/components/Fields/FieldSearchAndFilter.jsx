import React from "react";
import PropTypes from "prop-types";

export default function FieldSearchAndFilter({ onSearch, onFilterStatus, onFilterSize }) {
    return (
        <div className="flex items-center gap-4 mb-6">
            <div className="flex-grow flex items-center bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-md">
                <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M10 2a8 8 0 105.29 14.29l5 5a1 1 0 001.41-1.41l-5-5A8 8 0 0010 2zm0 2a6 6 0 11-6 6 6 6 0 016-6z"></path>
                </svg>
                <input
                    type="text"
                    placeholder="Geben Sie hier das gesuchte Feld an"
                    className="flex-grow pl-4 bg-gray-100 text-gray-800 outline-none"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg" onClick={onFilterStatus}>
                Status <span>▼</span>
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg" onClick={onFilterSize}>
                Größe <span>▼</span>
            </button>
        </div>
    );
}

FieldSearchAndFilter.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onFilterStatus: PropTypes.func.isRequired,
    onFilterSize: PropTypes.func.isRequired,
};
