// src/routes/analysis.js

import express from "express";
import { waterConsumptionAnalysis, optimizeNutrients } from "../Service/analyseService.js";

const router = express.Router();

/**
 * GET /analysis/:id/water-consumption
 * Endpoint für Wasserverbrauchsanalyse eines spezifischen Feldes
 */
router.get("/:id/water-consumption", async (req, res) => {
    try {
        const fieldId = req.params.id;
        const analysisResult = await waterConsumptionAnalysis(fieldId);
        res.json(analysisResult);
    } catch (err) {
        console.error("Fehler bei der Wasserverbrauchsanalyse:", err.message);
        res.status(500).json({ error: "Fehler bei der Wasserverbrauchsanalyse." });
    }
});

/**
 * GET /analysis/:id/optimize-nutrients
 * Endpoint für Nährstoffoptimierungsanalyse eines spezifischen Feldes
 */
router.get("/:id/optimize-nutrients", async (req, res) => {
    try {
        const fieldId = req.params.id;
        const analysisResult = await optimizeNutrients(fieldId);
        res.json(analysisResult);
    } catch (err) {
        console.error("Fehler bei der Nährstoffoptimierungsanalyse:", err.message);
        res.status(500).json({ error: "Fehler bei der Nährstoffoptimierungsanalyse." });
    }
});

/**
 * GET /analysis
 * Standard-Endpoint für /analysis
 */
router.get("/", (req, res) => {
    res.json({
        message: "Willkommen bei der Analyse-API",
        availableAnalyses: [
            "/analysis/:id/water-consumption",
            "/analysis/:id/optimize-nutrients"
        ]
    });
});

export default router;