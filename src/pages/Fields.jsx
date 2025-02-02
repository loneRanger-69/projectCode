// src/pages/Fields.jsx
//Code von Victor Bestea - 752622


import { useState, useEffect } from "react";
import axios from "axios";
import FieldSearchAndFilter from "../components/Fields/FieldSearchAndFilter";
import FieldTable from "../components/Fields/FieldTable";
import FieldDetailsModal from "../components/Fields/FieldDetailsModal";

export default function Fields() {
    // Lokaler State für Felder
    const [filteredFields, setFilteredFields] = useState([]);
    const [fields, setFields] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Ladezustand
    const [error, setError] = useState(null); // Fehlerzustand
    const [editField, setEditField] = useState(null); // Aktuelles Feld zum Bearbeiten
    const [newField, setNewField] = useState(null); // Neues Feld zum Hinzufügen
    const [detailsField, setDetailsField] = useState(null);

    // Daten von der API abrufen
    useEffect(() => {
        fetchFields();
    }, []);

    const fetchFields = async () => {
        setIsLoading(true); // Ladezustand aktivieren
        setError(null); // Fehler zurücksetzen
        try {
            const response = await axios.get("http://localhost:5001/fields");
            setFields(response.data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Felder:", error);
            setError("Fehler beim Abrufen der Felder.");
        } finally {
            setIsLoading(false); // Ladezustand deaktivieren
        }
    };

    const handleEditField = async (e) => {
        e.preventDefault(); // Verhindert das Neuladen der Seite
        setError(null); // Fehler zurücksetzen
        try {
            await axios.put(`http://localhost:5001/fields/${editField.id}`, editField);
            setEditField(null); // Bearbeitungsmodus beenden
            fetchFields(); // Daten nach dem Bearbeiten aktualisieren
        } catch (error) {
            console.error("Fehler beim Bearbeiten des Feldes:", error);
            setError("Fehler beim Bearbeiten des Feldes.");
        }
    };

    const handleDeleteField = async (fieldId) => {
        setError(null); // Fehler zurücksetzen
        try {
            await axios.delete(`http://localhost:5001/fields/${fieldId}`);
            fetchFields(); // Daten nach dem Löschen aktualisieren
        } catch (error) {
            console.error("Fehler beim Löschen des Feldes:", error);
            setError("Fehler beim Löschen des Feldes.");
        }
    };

    const handleAddField = async (e) => {
        e.preventDefault(); // Verhindert das Neuladen der Seite
        setError(null); // Fehler zurücksetzen
        try {
            await axios.post("http://localhost:5001/fields", newField);
            setNewField(null); // Formular zurücksetzen
            fetchFields(); // Daten nach dem Hinzufügen aktualisieren
        } catch (error) {
            console.error("Fehler beim Hinzufügen des Feldes:", error);
            setError("Fehler beim Hinzufügen des Feldes.");
        }
    };

    const handleSearch = (query) => {
        const lowerQuery = query.toLowerCase();
        const filtered = fields.filter((field) =>
            field.name.toLowerCase().includes(lowerQuery)
        );
        setFilteredFields(filtered);
    };

    const handleFilterStatus = (status) => {
        const filtered = fields.filter((field) => field.status === status);
        setFilteredFields(filtered);
    };

    const handleFilterSize = (size) => {
        let filtered = [];
        if (size === "<30 Hektar") {
            filtered = fields.filter((field) => Number(field.size) < 30);
        } else if (size === "30-100 Hektar") {
            filtered = fields.filter((field) => Number(field.size) >= 30 && Number(field.size) <= 100);
        } else if (size === ">100 Hektar") {
            filtered = fields.filter((field) => Number(field.size) > 100);
        }
        setFilteredFields(filtered);
    };

    return (
        <div className="pt-16 flex flex-col items-center min-h-screen bg-gray-100 px-6">
            <div className="w-full max-w-4xl">
                {/* Fehlermeldung */}
                {error && <div className="text-red-500 mb-4">{error}</div>}

                {/* Ladeanzeige */}
                {isLoading ? (
                    <div className="text-center text-gray-500">Lade Felder...</div>
                ) : (
                    <>
                        <FieldSearchAndFilter
                            onSearch={handleSearch}
                            onFilterStatus={handleFilterStatus}
                            onFilterSize={handleFilterSize}
                        />

                        {/* Bearbeitungsformular */}
                        {editField && (
                            <div className="bg-white p-4 shadow rounded mb-4">
                                <h3 className="text-lg font-bold mb-2">Feld bearbeiten</h3>
                                <form onSubmit={handleEditField}>
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-black">
                                            Feldname:
                                        </label>
                                        <input
                                            type="text"
                                            value={editField.name}
                                            onChange={(e) =>
                                                setEditField({ ...editField, name: e.target.value })
                                            }
                                            className="w-full border border-gray-300 bg-white text-black px-2 py-1 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-black">
                                            Größe (ha):
                                        </label>
                                        <input
                                            type="number"
                                            value={editField.size}
                                            onChange={(e) =>
                                                setEditField({ ...editField, size: e.target.value })
                                            }
                                            className="w-full border border-gray-300 bg-white text-black px-2 py-1 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-black">
                                            Status:
                                        </label>
                                        <select
                                            value={editField.status || ""}
                                            onChange={(e) =>
                                                setEditField({ ...editField, status: e.target.value })
                                            }
                                            className="w-full border border-gray-300 bg-white text-black px-2 py-1 rounded"
                                            required
                                        >
                                            {/* Alte Optionen */}
                                            <option value="Bepflanzt">Bepflanzt</option>
                                            <option value="Brachliegend">Brachliegend</option>
                                            <option value="In Bearbeitung">In Bearbeitung</option>
                                            <option value="Ernte">Ernte</option>
                                            <option value="Wachstum">Wachstum</option>
                                            <option value="Aussaat">Aussaat</option>
                                            {/* Neue Optionen */}
                                            <option value="Bewässerung">Bewässerung</option>
                                            <option value="Düngung">Düngung</option>
                                            <option value="Pflanzenschutz">Pflanzenschutz</option>
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-black">
                                            Saatgut:
                                        </label>
                                        <select
                                            value={editField.crop || ""}
                                            onChange={(e) =>
                                                setEditField({ ...editField, crop: e.target.value })
                                            }
                                            className="w-full border border-gray-300 bg-white text-black px-2 py-1 rounded"
                                            required
                                        >
                                            {/* Entferne die "Bitte wählen" Option beim Bearbeiten */}
                                            <option value="Sojabohnen">Sojabohnen</option>
                                            <option value="Weizen">Weizen</option>
                                            <option value="Mais">Mais</option>
                                            <option value="Kartoffeln">Kartoffeln</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Speichern
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditField(null)}
                                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                                    >
                                        Abbrechen
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Hinzufügen eines neuen Feldes */}
                        {newField && (
                            <div className="bg-white p-4 shadow rounded mb-4">
                                <h3 className="text-lg font-bold mb-2">Neues Feld hinzufügen</h3>
                                <form onSubmit={handleAddField}>
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-black">
                                            Feldname:
                                        </label>
                                        <input
                                            type="text"
                                            value={newField.name || ""}
                                            onChange={(e) =>
                                                setNewField({ ...newField, name: e.target.value })
                                            }
                                            className="w-full border border-gray-300 bg-white text-black px-2 py-1 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-black">
                                            Größe (ha):
                                        </label>
                                        <input
                                            type="number"
                                            value={newField.size || ""}
                                            onChange={(e) =>
                                                setNewField({ ...newField, size: e.target.value })
                                            }
                                            className="w-full border border-gray-300 bg-white text-black px-2 py-1 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-black">
                                            Status:
                                        </label>
                                        <select
                                            value={newField.status || ""}
                                            onChange={(e) =>
                                                setNewField({ ...newField, status: e.target.value })
                                            }
                                            className="w-full border border-gray-300 bg-white text-black px-2 py-1 rounded"
                                            required
                                        >
                                            <option value="">Bitte wählen</option>
                                            {/* Alte Optionen */}
                                            <option value="Bepflanzt">Bepflanzt</option>
                                            <option value="Brachliegend">Brachliegend</option>
                                            <option value="In Bearbeitung">In Bearbeitung</option>
                                            <option value="Ernte">Ernte</option>
                                            <option value="Wachstum">Wachstum</option>
                                            <option value="Aussaat">Aussaat</option>
                                            {/* Neue Optionen */}
                                            <option value="Bewässerung">Bewässerung</option>
                                            <option value="Düngung">Düngung</option>
                                            <option value="Pflanzenschutz">Pflanzenschutz</option>
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-black">
                                            pH-Wert:
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={newField.ph || ""}
                                            onChange={(e) =>
                                                setNewField({ ...newField, ph: e.target.value })
                                            }
                                            className="w-full border border-gray-300 bg-white text-black px-2 py-1 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-black">
                                            Feuchtigkeit:
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={newField.moisture || ""}
                                            onChange={(e) =>
                                                setNewField({ ...newField, moisture: e.target.value })
                                            }
                                            className="w-full border border-gray-300 bg-white text-black px-2 py-1 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-black">
                                            Nährstoffe (g/m²):
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={newField.nutrients || ""}
                                            onChange={(e) =>
                                                setNewField({ ...newField, nutrients: e.target.value })
                                            }
                                            className="w-full border border-gray-300 bg-white text-black px-2 py-1 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-black">
                                            Saatgut:
                                        </label>
                                        <select
                                            value={newField.crop || ""}
                                            onChange={(e) =>
                                                setNewField({ ...newField, crop: e.target.value })
                                            }
                                            className="w-full border border-gray-300 bg-white text-black px-2 py-1 rounded"
                                            required
                                        >
                                            <option value="">Bitte wählen</option>
                                            <option value="Sojabohnen">Sojabohnen</option>
                                            <option value="Weizen">Weizen</option>
                                            <option value="Mais">Mais</option>
                                            <option value="Kartoffeln">Kartoffeln</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Hinzufügen
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setNewField(null)}
                                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                                    >
                                        Abbrechen
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Feldtabelle */}
                        <FieldTable
                            fields={filteredFields.length > 0 ? filteredFields : fields}
                            onDetails={(field) => setDetailsField(field)}
                            onEdit={(field) => setEditField(field)}
                            onDelete={(fieldId) => handleDeleteField(fieldId)}
                        />

                        {/* Hinzufügen eines neuen Feldes */}
                        {!newField && (
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={() =>
                                        setNewField({
                                            name: "",
                                            size: "",
                                            status: "",
                                            ph: "",
                                            moisture: "",
                                            nutrients: "",
                                            crop: "",
                                        })
                                    }
                                    className="bg-blue-500 text-white px-6 py-2 rounded"
                                >
                                    Neues Feld hinzufügen
                                </button>
                            </div>
                        )}

                        {/* Details-Modal */}
                        <FieldDetailsModal
                            field={detailsField}
                            onClose={() => setDetailsField(null)}
                        />
                    </>
                )}
            </div>
        </div>
    );
}