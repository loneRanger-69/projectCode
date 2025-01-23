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

// GET: Details für ein Feld
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

// src/routes/fields.js

// POST: Neues Feld hinzufügen
router.post("/", async (req, res) => {
    try {
        const {
            name, size, status, ph_value, moisture, nutrients, crop
        } = req.body;

        const newField = await db("fields")
            .insert({
                name,
                size,
                status,
                ph_value,
                moisture,
                nutrients,
                crop, // Neu: Saatgut
            })
            .returning("*");

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
    try {
        const rowsDeleted = await db("fields").where({ id: req.params.id }).del();
        if (rowsDeleted === 0) {
            return res.status(404).json({ error: "Feld nicht gefunden" });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Fehler beim Löschen des Feldes:", error);
        res.status(500).json({ error: "Fehler beim Löschen des Feldes" });
    }
});

/**
 * POST /fields/simulate
 * Generiert ZUFALLSWERTE für pH, Feuchtigkeit, Nährstoffe, Regenwahrscheinlichkeit
 * und speichert sie PERSISTENT in der DB.
 */
router.post("/simulate", async (req, res) => {
    try {
        // 1) Alle vorhandenen Felder abrufen
        const fields = await db("fields").select("*");

        // 2) Für jedes Feld zufällige Werte generieren
        const updates = fields.map(async (field) => {
            const randomPh = (Math.random() * 2 + 5.5).toFixed(1);     // 5.5 - 7.5
            const randomMoisture = Math.floor(Math.random() * 51) + 30; // 30-80
            const randomNutrients = (Math.random() * 10 + 10).toFixed(1); // 10.0-20.0

            return db("fields").where({ id: field.id }).update({
                ph_value: randomPh,
                moisture: randomMoisture,
                nutrients: randomNutrients,
            });
        });

        await Promise.all(updates);

        // 3) Aktualisierte Felder zurückgeben
        const updatedFields = await db("fields").select("*");
        res.json({
            message: "Zufällige Sensordaten generiert.",
            fields: updatedFields,
        });
    } catch (error) {
        console.error("Fehler bei der Simulation:", error);
        res.status(500).json({ error: "Fehler bei der Simulation der Sensordaten." });
    }
});

export default router;
