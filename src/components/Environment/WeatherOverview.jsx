import PropTypes from 'prop-types';

export default function WeatherOverview({ temperature, rainProb, location }) {
    return (
        <div className="bg-blue-100 rounded-md p-4 shadow">
            <h2 className="text-xl font-bold">{location}</h2>
            <p>Temperatur: {temperature}°C</p>
            <p>Regenwahrscheinlichkeit: {rainProb}%</p>
        </div>
    );
}

WeatherOverview.propTypes = {
    temperature: PropTypes.number.isRequired,
    rainProb: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
};
