// src/routes/analysis.js
import express from "express";
import db from "../db.js";
import { cropOptimalValues } from "../data/cropOptimalValues.js";


const router = express.Router();

router.get("/:id/optimize-nutrients", async (req, res) => {
    try {
        const field = await db("fields").where({ id: req.params.id }).first();

        if (!field) {
            return res.status(404).json({ error: "Feld nicht gefunden" });
        }

        const crop = field.crop;
        if (!crop || !cropOptimalValues[crop]) {
            return res.status(400).json({ error: `Keine optimalen Werte für '${crop}' definiert.` });
        }

        const { optimalPh, optimalNutrients } = cropOptimalValues[crop];
        const nutrientAdjustment = optimalNutrients - field.nutrients;
        const phAdjustment = optimalPh - field.ph_value;

        res.json({
            crop,
            optimalPh,
            optimalNutrients,
            currentPh: field.ph_value,
            currentNutrients: field.nutrients,
            nutrientAdjustment: nutrientAdjustment.toFixed(1),
            phAdjustment: phAdjustment.toFixed(1),
            message: `Für ${crop} sollte der pH-Wert um ${phAdjustment.toFixed(
                1
            )} angepasst werden. Die Nährstoffe sollten um ${nutrientAdjustment.toFixed(1)} geändert werden.`,
        });
    } catch (err) {
        console.error("Fehler bei der Nährstoffanalyse:", err);
        res.status(500).json({ error: "Fehler bei der Nährstoffanalyse." });
    }
});

export default router;
