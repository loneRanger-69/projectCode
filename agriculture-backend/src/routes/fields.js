import express from "express";
import db from "../db.js";

const router = express.Router();

// GET: Alle Felder abrufen
router.get("/", async (req, res) => {
    try {
        const fields = await db("fields").select("*");
        res.json(fields);
    } catch (error) {
        console.error("Fehler beim Abrufen der Felder:", error);
        res.status(500).json({ error: "Fehler beim Abrufen der Felder" });
    }
});

// GET: Details für ein Feld abrufen
router.get("/:id", async (req, res) => {
    try {
        const field = await db("fields").where({ id: req.params.id }).first();

        if (!field) {
            return res.status(404).json({ error: "Feld nicht gefunden" });
        }

        res.json(field);
    } catch (error) {
        console.error("Fehler beim Abrufen der Feld-Details:", error);
        res.status(500).json({ error: "Fehler beim Abrufen der Feld-Details" });
    }
});

// POST: Neues Feld hinzufügen
router.post("/", async (req, res) => {
    try {
        const { name, size, status, ph_value, moisture, nutrients } = req.body;
        const newField = await db("fields").insert({
            name,
            size,
            status,
            ph_value,
            moisture,
            nutrients,
        }).returning("*");
        res.status(201).json(newField);
    } catch (error) {
        console.error("Fehler beim Hinzufügen eines Feldes:", error);
        res.status(500).json({ error: "Fehler beim Hinzufügen eines Feldes" });
    }
});

// PUT: Feld aktualisieren
router.put("/:id", async (req, res) => {
    try {
        const updatedField = await db("fields")
            .where({ id: req.params.id })
            .update(req.body)
            .returning("*");

        if (updatedField.length === 0) {
            return res.status(404).json({ error: "Feld nicht gefunden" });
        }

        res.json(updatedField[0]);
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Feldes:", error);
        res.status(500).json({ error: "Fehler beim Aktualisieren des Feldes" });
    }
});

// DELETE: Feld löschen
router.delete("/:id", async (req, res) => {
    console.log("DELETE-Anfrage für ID:", req.params.id); // Debugging
    try {
        const rowsDeleted = await db("fields").where({ id: req.params.id }).del();
        console.log("Gelöschte Zeilen:", rowsDeleted); // Debugging-Ausgabe
        if (rowsDeleted === 0) {
            return res.status(404).json({ error: "Feld nicht gefunden" });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Fehler beim Löschen des Feldes:", error);
        res.status(500).json({ error: "Fehler beim Löschen des Feldes" });
    }
});

export default router;
