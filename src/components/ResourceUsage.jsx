import { React } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// ChartJS-Registrierung
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function ResourceUsage() {
    const data = {
        labels: ["Saatgut", "Dünger", "Wasser"],
        datasets: [
            {
                label: "Auslastung (%)",
                data: [60, 30, 80], // Dummy-Daten
                backgroundColor: ["#34D399", "#FACC15", "#60A5FA"],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Ressourcenauslastung",
            },
        },
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-2">Ressourcenauslastung</h2>
            <Bar data={data} options={options} />
        </div>
    );
}

export default ResourceUsage;
