import React, { useState, useEffect } from "react";
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
import ResourceManage from "./resourceManage";
import ResourceDeployment from "./resourceDeployment";
import axios from "axios";

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
  const [showManage, setShowManage] = useState(false);
  const [showDeploy, setShowDeploy] = useState(false); // Neuer State für Deployment-Modal
  const [chartData, setChartData] = useState({
    labels: ["Dünger", "Wasser"],
    datasets: [
      {
        label: "Verfügbarkeit (%)",
        data: [0, 0],
        backgroundColor: ["#FACC15", "#60A5FA"],
      },
    ],
  });

  const fetchResourceData = async () => {
    try {
      // Abrufen der beiden Endpunktdaten
      const [availableResponse, deploymentResponse] = await Promise.all([
        axios.get("http://localhost:5001/resource-available/total"),
        axios.get("http://localhost:5001/resource-deployment/total"),
      ]);

      const availableData = availableResponse.data;
      const deploymentData = deploymentResponse.data;

      // Berechnungen
      const remainingWasser = availableData.totalWasser - deploymentData.totalWasser;
      const remainingDungemittel = availableData.totalDungemittel - deploymentData.totalDungemittel;

      const percentWasser = (remainingWasser / availableData.totalWasser) * 100;
      const percentDungemittel = (remainingDungemittel / availableData.totalDungemittel) * 100;

      // Aktualisierung der Diagrammdaten
      setChartData({
        ...chartData,
        datasets: [
          {
            ...chartData.datasets[0],
            data: [percentDungemittel, percentWasser],
          },
        ],
      });
    } catch (error) {
      console.error("Fehler beim Abrufen oder Berechnen der Daten:", error);
    }
  };

  useEffect(() => {
    fetchResourceData();
  }, [showManage, showDeploy]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Ressourcenauslastung",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md relative min-h-[350px]">
      <h2 className="text-lg font-bold mb-4">Ressourcenauslastung</h2>

      <div className="h-64 mb-4">
        <Bar data={chartData} options={options} />
      </div>

      <div className="flex gap-4"> {/* Flex-Container für Buttons */}
        <button
          onClick={() => setShowManage(true)}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Ressourcen verwalten
        </button>

        <button
          onClick={() => setShowDeploy(true)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Ressource einsetzen
        </button>
      </div>

      {showManage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <ResourceManage
              onClose={() => setShowManage(false)}
              userId="current_user_id"
              onUpdate={fetchResourceData}
            />
          </div>
        </div>
      )}

      {showDeploy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <ResourceDeployment
              onClose={() => setShowDeploy(false)}
              userId="current_user_id"
              onUpdate={fetchResourceData}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ResourceUsage;