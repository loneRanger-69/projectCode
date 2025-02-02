//Code von Muhammad Ilzam Fachreza Sianipar (768835)
import React, { useState, useEffect } from "react";
import axios from "axios";

function ResourceDeployment({ onClose }) {
  // State für die Ressourcen und Eingabefelder
  const [resources, setResources] = useState([]);
  const [wasser, setWasser] = useState("");
  const [dungemittel, setDungemittel] = useState("");
  const [feldName, setFeldName] = useState("");
  const [resourceIdToDelete, setResourceIdToDelete] = useState("");

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

  // Handler für das Löschen einer Ressource
  const handleDeleteResource = async () => {
    if (!resourceIdToDelete) {
      alert("Bitte wählen Sie eine Ressource aus.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5001/resource-deployment/resources/${resourceIdToDelete}`);
      alert(`Ressource mit ID ${resourceIdToDelete} erfolgreich gelöscht.`);
      setResourceIdToDelete("");
      // Daten nach dem Löschen erneut abrufen
      const response = await axios.get("http://localhost:5001/resource-deployment/resources");
      setResources(response.data);
    } catch (error) {
      console.error("Fehler beim Löschen der Ressource:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4">Ressourcen Einsatz verwalten</h2>

        {/* Liste der Ressourcen */}
        <div className="mb-4">
          <h3 className="text-md font-semibold">Bestehende benutzte Ressourcen</h3>
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
            Ressourcen hinzufügen
          </button>
        </form>

        {/* Auswahlfeld für Ressource zum Löschen */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Feld auswählen zur Entlastung :
          </label>
          <select
            value={resourceIdToDelete}
            onChange={(e) => setResourceIdToDelete(e.target.value)}
            className="w-full mt-1 p-2 border border-black bg-white text-black rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="">Bitte ein Feld auswählen</option>
            {resources.map((resource) => (
              <option key={resource.ID} value={resource.ID}>
                {resource.FeldName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleDeleteResource}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Löschen
          </button>

          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResourceDeployment;