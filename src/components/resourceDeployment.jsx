import React, { useState, useEffect } from "react";
import axios from "axios";

function ResourceDeployment({ onClose }) {
  // State für die Ressourcen und Eingabefelder
  const [resources, setResources] = useState([]);
  const [wasser, setWasser] = useState("");
  const [dungemittel, setDungemittel] = useState("");
  const [feldName, setFeldName] = useState("");

  // Daten beim Laden des Popups abrufen
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get("http://localhost:5001/resource-deployment/resources");
        setResources(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Ressourcen:", error);
      }
    };
    
    fetchResources();
  }, []);

  // Handler für das Hinzufügen einer neuen Ressource
  const handleAddResource = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/resource-deployment/add", {
        Wasser: wasser,
        Düngemittel: dungemittel,
        FeldName: feldName,
      });
      // Daten nach dem Hinzufügen erneut abrufen
      const response = await axios.get("http://localhost:5001/resource-deployment/resources");
      setResources(response.data);
      setWasser("");
      setDungemittel("");
      setFeldName("");
    } catch (error) {
      console.error("Fehler beim Hinzufügen der Ressource:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4">Ressourcen verwalten</h2>

        {/* Liste der Ressourcen */}
        <div className="mb-4">
          <h3 className="text-md font-semibold">Bestehende Ressourcen</h3>
          <ul>
            {resources.map((resource) => (
              <li key={resource.ID}>
                <p>Feldname: {resource.FeldName}</p>
                <p>Wasser: {resource.Wasser} L</p>
                <p>Düngemittel: {resource.Düngemittel} kg</p>
                <hr className="my-2" />
              </li>
            ))}
          </ul>
        </div>

        {/* Formular zum Hinzufügen einer neuen Ressource */}
        <form onSubmit={handleAddResource}>
          <div className="mb-2">
            <label className="block">Feldname:</label>
            <input
              type="text"
              value={feldName}
              onChange={(e) => setFeldName(e.target.value)}
              className="w-full p-2 border border-black bg-white text-black rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block">Wasser (L):</label>
            <input
              type="number"
              value={wasser}
              onChange={(e) => setWasser(e.target.value)}
              className="w-full p-2 border border-black bg-white text-black rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block">Düngemittel (kg):</label>
            <input
              type="number"
              value={dungemittel}
              onChange={(e) => setDungemittel(e.target.value)}
              className="w-full p-2 border border-black bg-white text-black rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Ressource hinzufügen
          </button>
        </form>

        {/* Schließen Button */}
        <button
          onClick={onClose}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}

export default ResourceDeployment;