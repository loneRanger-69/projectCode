//Code von Victor Bestea - 752622

// Importiere das Express-Framework und die Datenbankverbindung
import express from "express"; // Import von Express zur Erstellung von HTTP-Servern
import db from "../db.js"; // Import der Datenbankverbindung aus der db.js-Datei

// Initialisiere den Router von Express
const router = express.Router(); // Erzeugt einen neuen Router, um Routen modular zu verwalten

// GET: Alle Felder abrufen
router.get("/", async (req, res) => {
    try {
        const fields = await db("fields").select("*"); // Abrufen aller Einträge aus der Tabelle 'fields'
        res.json(fields); // Rückgabe der abgerufenen Felder als JSON
    } catch (error) {
        console.error("Fehler beim Abrufen der Felder:", error);
        res.status(500).json({ error: "Fehler beim Abrufen der Felder" }); // Fehlerbehandlung bei Datenbankzugriffsproblemen
    }
});

// GET: Details für ein bestimmtes Feld anhand der ID
router.get("/:id", async (req, res) => {
    try {
        const field = await db("fields").where({ id: req.params.id }).first(); // Suche nach einem Feld mit der angegebenen ID
        if (!field) {
            return res.status(404).json({ error: "Feld nicht gefunden" }); // Fehlermeldung, wenn das Feld nicht existiert
        }
        res.json(field); // Rückgabe des gefundenen Feldes als JSON
    } catch (error) {
        console.error("Fehler beim Abrufen der Feld-Details:", error);
        res.status(500).json({ error: "Fehler beim Abrufen der Feld-Details" }); // Fehlerbehandlung bei Datenbankzugriffsproblemen
    }
});

// POST: Neues Feld hinzufügen
router.post("/", async (req, res) => {
    try {
        const {
            name, size, status, ph_value, moisture, nutrients, crop
        } = req.body; // Extrahiere die Felddaten aus dem Anfragekörper

        const newField = await db("fields")
            .insert({
                name,
                size,
                status,
                ph_value,
                moisture,
                nutrients,
                crop, // Hinzufügen des Saatguts
            })
            .returning("*"); // Gibt das neu hinzugefügte Feld zurück

        res.status(201).json(newField); // Erfolgsantwort mit dem neuen Feld
    } catch (error) {
        console.error("Fehler beim Hinzufügen eines Feldes:", error);
        res.status(500).json({ error: "Fehler beim Hinzufügen eines Feldes" }); // Fehlerbehandlung bei Einfügeproblemen
    }
});

// PUT: Bestehendes Feld aktualisieren
router.put("/:id", async (req, res) => {
    try {
        const updatedField = await db("fields")
            .where({ id: req.params.id }) // Suche nach dem Feld anhand der ID
            .update(req.body) // Aktualisiere das Feld mit den neuen Daten
            .returning("*"); // Gibt das aktualisierte Feld zurück

        if (updatedField.length === 0) {
            return res.status(404).json({ error: "Feld nicht gefunden" }); // Fehlermeldung, wenn das Feld nicht existiert
        }

        res.json(updatedField[0]); // Erfolgsantwort mit dem aktualisierten Feld
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Feldes:", error);
        res.status(500).json({ error: "Fehler beim Aktualisieren des Feldes" }); // Fehlerbehandlung bei Aktualisierungsproblemen
    }
});

// DELETE: Feld löschen
router.delete("/:id", async (req, res) => {
    try {
        const rowsDeleted = await db("fields").where({ id: req.params.id }).del(); // Löschen des Feldes anhand der ID
        if (rowsDeleted === 0) {
            return res.status(404).json({ error: "Feld nicht gefunden" }); // Fehlermeldung, wenn das Feld nicht existiert
        }
        res.status(204).send(); // Erfolgsantwort ohne Inhalt (204 No Content)
    } catch (error) {
        console.error("Fehler beim Löschen des Feldes:", error);
        res.status(500).json({ error: "Fehler beim Löschen des Feldes" }); // Fehlerbehandlung bei Löschproblemen
    }
});

/**
 * POST /fields/simulate
 * Diese Route generiert zufällige Werte für pH-Wert, Feuchtigkeit und Nährstoffe
 * für alle Felder und speichert diese änderungen persistent in der Datenbank.
 */
router.post("/simulate", async (req, res) => {
    try {
        // 1) Abrufen aller vorhandenen Felder
        const fields = await db("fields").select("*");

        // 2) Generieren zufälliger Werte für jedes Feld
        const updates = fields.map(async (field) => {
            const randomPh = (Math.random() * 2 + 5.5).toFixed(1);     // pH-Wert zwischen 5.5 und 7.5
            const randomMoisture = Math.floor(Math.random() * 51) + 30; // Feuchtigkeitswert zwischen 30 und 80
            const randomNutrients = (Math.random() * 10 + 10).toFixed(1); // Nährstoffgehalt zwischen 10.0 und 20.0

            // Aktualisiere das Feld mit den generierten Werten
            return db("fields").where({ id: field.id }).update({
                ph_value: randomPh,
                moisture: randomMoisture,
                nutrients: randomNutrients,
            });
        });

        await Promise.all(updates); // Warten, bis alle Felder aktualisiert wurden

        // 3) Rückgabe der aktualisierten Felder
        const updatedFields = await db("fields").select("*");
        res.json({
            message: "Zufällige Sensordaten generiert.",
            fields: updatedFields, // Erfolgsantwort mit den aktualisierten Feldern
        });
    } catch (error) {
        console.error("Fehler bei der Simulation:", error);
        res.status(500).json({ error: "Fehler bei der Simulation der Sensordaten." }); // Fehlerbehandlung bei Simulationsproblemen
    }
});

// Exportiere den Router, um ihn in der Hauptanwendung zu verwenden
export default router; // Stellt die definierten Routen für andere Teile der Anwendung bereit
