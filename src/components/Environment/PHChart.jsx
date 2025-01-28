import { Bar } from "react-chartjs-2";

export default function PhChart({ phData }) {
    const chartData = {
        labels: phData.map((entry) => entry.date), // Datum
        datasets: [
            {
                label: "pH-Wert",
                data: phData.map((entry) => entry.ph_value), // pH-Wert
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 14, // Maximaler pH-Wert
            },
        },
    };

    return <Bar data={chartData} options={options} />;
}
