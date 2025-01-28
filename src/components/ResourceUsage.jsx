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
  const [chartData, setChartData] = useState({
    labels: ["Dünger", "Wasser"], // Nur noch zwei Kategorien
    datasets: [
      {
        label: "Auslastung (%)",
        data: [0, 0], // Initialwerte
        backgroundColor: ["#FACC15", "#60A5FA"], // Nur noch zwei Farben
      },
    ],
  });
  const [userId] = useState("current_user_id"); // Hier durch echte User-ID ersetzen

  // Daten vom Server abrufen
  const fetchResourceData = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/resource-usage/${userId}`);
      if (response.data) {
        const newData = [
          response.data.dunger || 0,
          response.data.wasser || 0
        ];
        setChartData({
          ...chartData,
          datasets: [{
            ...chartData.datasets[0],
            data: newData
          }]
        });
      }
    } catch (error) {
      console.error("Datenabruf fehlgeschlagen:", error);
    }
  };

  useEffect(() => {
    fetchResourceData();
  }, [userId, showManage]);

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
          callback: function(value) {
            return value + "%";
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md relative min-h-[350px]">
      <h2 className="text-lg font-bold mb-4">Ressourcenauslastung</h2>
      
      <div className="h-64 mb-4">
        <Bar data={chartData} options={options} />
      </div>

      <button 
        onClick={() => setShowManage(true)}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
      >
        Ressourcen verwalten
      </button>

      {showManage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <ResourceManage 
              onClose={() => setShowManage(false)} 
              userId={userId}
              onUpdate={fetchResourceData}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ResourceUsage;