import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ResourceManage() {
  const navigate = useNavigate();
  const [resources, setResources] = useState({ water: 0, fertilizer: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stildefinition für beide Buttons
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/resource-available");
        if (!response.ok) throw new Error("Fehler beim Abrufen der Daten");
        
        const data = await response.json();
        setResources({
          water: data.water,
          fertilizer: data.fertilizer
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setResources(prev => ({
      ...prev,
      [field]: parseInt(value, 10) || 0
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5001/resource-available", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resources)
      });

      if (!response.ok) throw new Error("Fehler beim Speichern");
      alert("Daten erfolgreich aktualisiert!");
    } catch (err) {
      alert(`Speichern fehlgeschlagen: ${err.message}`);
    }
  };

  if (loading) return <p>Daten werden geladen...</p>;
  if (error) return <p>Fehler: {error}</p>;

  return (
    <div>
      <h2>Ressourcen verwalten</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}>
        <div>
          <label>
            Wasser:
            <input
              type="number"
              value={resources.water}
              onChange={(e) => handleInputChange('water', e.target.value)}
              style={{ 
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px',
                marginLeft: '8px'
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Düngemittel:
            <input
              type="number"
              value={resources.fertilizer}
              onChange={(e) => handleInputChange('fertilizer', e.target.value)}
              style={{ 
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px',
                marginLeft: '8px'
              }}
            />
          </label>
        </div>
        <button 
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
        >
          Speichern
        </button>
        <button 
          type="button" 
          onClick={() => navigate("/")}
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
        >
          Abbrechen
        </button>
      </form>
    </div>
  );
}

export default ResourceManage;