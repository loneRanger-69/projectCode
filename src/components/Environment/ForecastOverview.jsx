// src/components/Environment/ForecastOverview.jsx

import PropTypes from "prop-types";

export default function ForecastOverview({ forecastData }) {
    if (!forecastData) {
        return (
            <div className="bg-blue-100 rounded-md p-4 shadow w-full">
                <h2 className="text-xl font-bold mb-2">5-Tage Prognose</h2>
                <p>Lade Prognose...</p>
            </div>
        );
    }

    return (
        <div className="bg-blue-100 rounded-md p-4 shadow w-full">
            <h2 className="text-xl font-bold mb-2">5-Tage Prognose</h2>
            <div className="flex flex-row justify-between mt-2">
                {forecastData.map((day, idx) => (
                    <div key={idx} className="text-center">
                        <p>{day.date}</p>
                        <p>{day.temperature}°C</p>
                        <p>{day.rainProb}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

ForecastOverview.propTypes = {
    forecastData: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            temperature: PropTypes.number.isRequired,
            rainProb: PropTypes.number.isRequired,
        })
    ),
};
