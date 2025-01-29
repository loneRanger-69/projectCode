import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ResourceManage({onClose, onUpdate}) {
  const navigate = useNavigate();
  const [resources, setResources] = useState({ Wasser: 0, Düngemittel: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Button- und Eingabefeld-Stile
  const buttonStyle = {
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px 16px',
    margin: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const inputStyle = {
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
    marginLeft: '8px'
  };

  // Daten aus der Datenbank laden
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/resource-available/");
        if (!response.ok) throw new Error("Fehler beim Abrufen der Daten");

        const data = await response.json();
        setResources({
          Wasser: data.Wasser,
          Düngemittel: data.Düngemittel
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Eingaben des Nutzers verarbeiten
  const handleInputChange = (field, value) => {
    setResources((prev) => ({
      ...prev,
      [field]: parseInt(value, 10) || 0
    }));
  };

  // Daten speichern
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5001/resource-available/", {
        method: "PUT", // Hier wird die Ressource aktualisiert
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resources)
      });
  
      if (!response.ok) throw new Error("Fehler beim Speichern");
  
      alert("Daten erfolgreich aktualisiert!");
  
      if (onUpdate) {  // Prüft, ob onUpdate existiert, bevor sie aufgerufen wird
        console.log("Diagramm wird aktualisiert...");
        onUpdate(); 
      }
    
      if (onClose) {  // Prüft, ob onClose existiert, bevor sie aufgerufen wird
        console.log("Modal wird geschlossen...");
        onClose();
      }
  
    } catch (err) {
      alert(`Speichern fehlgeschlagen: ${err.message}`);
    }
  };

  // Bedingtes Rendering für Ladezustand und Fehler
  if (loading) return <p>Daten werden geladen...</p>;
  if (error) return <p>Fehler: {error}</p>;

  // Formular-Rendering
  return (
    <div>
      <h2>Verfügbare Ressourcen verwalten</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div>
          <label>
            Wasser:
            <input
              type="number"
              value={resources.Wasser}
              onChange={(e) => handleInputChange("Wasser", e.target.value)}
              style={inputStyle}
            />
            <span> L</span> {/* Einheit für Wasser */}
          </label>
        </div>
        <div>
          <label>
            Düngemittel:
            <input
              type="number"
              value={resources.Düngemittel}
              onChange={(e) => handleInputChange("Düngemittel", e.target.value)}
              style={inputStyle}
            />
            <span> kg</span> {/* Einheit für Düngemittel */}
          </label>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#28a745", // Grün für Speichern
            color: "white", // Weißer Text
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            margin: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Speichern
        </button>
        <button
          type="button"
          onClick={() => {
            console.log("Abbrechen-Button wurde geklickt!"); // Debugging
            if (onClose) onClose();
          }}
          style={{
            backgroundColor: "#dc3545", // Rot für Abbrechen
            color: "white", // Weißer Text
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            margin: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
        >
          Abbrechen
        </button>
      </form>
    </div>
  );
}

export default ResourceManage;