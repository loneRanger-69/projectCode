import PropTypes from "prop-types";
import { useState } from "react";

export default function FieldSearchAndFilter({ onSearch, onFilterStatus, onFilterSize }) {
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [isSizeOpen, setIsSizeOpen] = useState(false);

    return (
        <div className="flex flex-wrap gap-4 items-center">
            {/* Suchfeld */}
            <input
                type="text"
                placeholder="Geben Sie hier das gesuchte Feld an"
                onChange={(e) => onSearch(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 bg-white text-black flex-grow"
            />

            {/* Status Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setIsStatusOpen((prev) => !prev)}
                    className="bg-white text-black border border-gray-300 rounded px-4 py-2"
                >
                    Status ▼
                </button>
                {isStatusOpen && (
                    <div className="absolute bg-white text-black shadow-lg rounded mt-2 z-10">
                        {/* NEUE Status-Buttons */}
                        <button
                            onClick={() => {
                                onFilterStatus("Bepflanzt");
                                setIsStatusOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Bepflanzt
                        </button>
                        <button
                            onClick={() => {
                                onFilterStatus("Brachliegend");
                                setIsStatusOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Brachliegend
                        </button>
                        <button
                            onClick={() => {
                                onFilterStatus("Ernte");
                                setIsStatusOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Ernte
                        </button>
                        <button
                            onClick={() => {
                                onFilterStatus("Wachstum");
                                setIsStatusOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Wachstum
                        </button>
                        <button
                            onClick={() => {
                                onFilterStatus("Aussaat");
                                setIsStatusOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Aussaat
                        </button>

                        {/* ALTE Status-Buttons */}
                        <button
                            onClick={() => {
                                onFilterStatus("Bewässerung");
                                setIsStatusOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Bewässerung
                        </button>
                        <button
                            onClick={() => {
                                onFilterStatus("Düngung");
                                setIsStatusOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Düngung
                        </button>
                        <button
                            onClick={() => {
                                onFilterStatus("Pflanzenschutz");
                                setIsStatusOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            Pflanzenschutz
                        </button>
                    </div>
                )}
            </div>

            {/* Größe Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setIsSizeOpen((prev) => !prev)}
                    className="bg-white text-black border border-gray-300 rounded px-4 py-2"
                >
                    Größe ▼
                </button>
                {isSizeOpen && (
                    <div className="absolute bg-white text-black shadow-lg rounded mt-2 z-10">
                        <button
                            onClick={() => {
                                onFilterSize("<30 Hektar");
                                setIsSizeOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            &lt; 30 Hektar
                        </button>
                        <button
                            onClick={() => {
                                onFilterSize("30-100 Hektar");
                                setIsSizeOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            30-100 Hektar
                        </button>
                        <button
                            onClick={() => {
                                onFilterSize(">300 Hektar");
                                setIsSizeOpen(false);
                            }}
                            className="bg-white block px-4 py-2 w-full text-left"
                        >
                            &gt; 300 Hektar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

FieldSearchAndFilter.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onFilterStatus: PropTypes.func.isRequired,
    onFilterSize: PropTypes.func.isRequired,
};