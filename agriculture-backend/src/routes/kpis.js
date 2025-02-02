// src/routes/kpis.js

import express from "express"; //Code von Muhammad Ilzam Fachreza Sianipar (768835)
import db from "../db.js"; // deine Knex- oder DB-Instanz

const router = express.Router();

/**
 * GET /kpis
 * Gibt ein JSON-Objekt zurück, z. B. { totalFields: 10, plantedFields: 8, harvestedFields: 4 }
 */
router.get("/", async (req, res) => {
    try {
        // 1) totalFields = Anzahl aller Felder
        const totalResult = await db("fields").count("id as cnt");
        const totalFields = totalResult[0].cnt;

        // 2) plantedFields = Felder, die z. B. den Status "Bepflanzt" haben
        const plantedResult = await db("fields")
            .where("status", "Bepflanzt")
            .count("id as cnt");
        const plantedFields = plantedResult[0].cnt;

        // 3) harvestedFields = Felder, die z. B. den Status "Ernte" haben
        const harvestedResult = await db("fields")
            .where("status", "Ernte")
            .count("id as cnt");
        const harvestedFields = harvestedResult[0].cnt;

        // Nun geben wir ein Objekt zurück
        res.json({
            totalFields: totalFields,
            plantedFields: plantedFields,
            harvestedFields: harvestedFields
        });
    } catch (err) {
        console.error("Fehler beim Abrufen der KPIs:", err);
        res.status(500).json({ error: "Fehler beim Abrufen der KPI-Daten" });
    }
});

export default router;