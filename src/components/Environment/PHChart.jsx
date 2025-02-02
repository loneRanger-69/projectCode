//Dieser Code wurde bearbeitet von Philipp Pister

import { Bar } from "react-chartjs-2"; // Importiere die Bar-Chart-Komponente von Chart.js

/**
 * pH-Chart-Komponente zur Visualisierung des pH-Verlaufs eines Feldes
 * @param {Array} phData - Array mit Objekten, die das Datum und den pH-Wert enthalten
 */
export default function PhChart({ phData }) {
    // Vorbereitung der Chart-Daten
    const chartData = {
        labels: phData.map((entry) => entry.date), // X-Achse: Datum
        datasets: [
            {
                label: "pH-Wert", // Legende für den Datensatz
                data: phData.map((entry) => entry.ph_value), // Y-Achse: pH-Werte
                backgroundColor: "rgba(75, 192, 192, 0.6)", // Farbe der Balken (leicht transparent)
                borderColor: "rgba(75, 192, 192, 1)", // Randfarbe der Balken
                borderWidth: 1, // Randstärke
            },
        ],
    };

    // Konfiguration der Achsen und Skalierung
    const options = {
        scales: {
            y: {
                beginAtZero: true, // Startet die Y-Achse bei 0
                max: 14, // Maximaler pH-Wert (Skala von 0 bis 14)
            },
        },
    };

    return <Bar data={chartData} options={options} />; // Rendert die Balkendiagramm-Komponente
}
