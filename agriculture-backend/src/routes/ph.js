import express from "express";
import db from "../db.js";

const router = express.Router();

/**
 * Route: pH-Verlauf eines Feldes abrufen
 * GET /ph-history/:fieldId
 */
router.get("/history/:fieldId", async (req, res) => {
    const { fieldId } = req.params;

    try {
        const phHistory = await db("field_ph_history")
            .select("date", "ph_value")
            .where("field_id", fieldId)
            .orderBy("date", "desc")
            .limit(7); // Letzte 7 Tage
        res.json(phHistory);
    } catch (err) {
        console.error("Fehler beim Abrufen des pH-Verlaufs:", err);
        res.status(500).json({ error: "Fehler beim Abrufen des pH-Verlaufs." });
    }
});

/**
 * Route: Zufällige pH-Werte für ein Feld simulieren
 * POST /ph/simulate/:fieldId
 */
router.post("/simulate/:fieldId", async (req, res) => {
    const { fieldId } = req.params;

    try {
        // Simuliere die letzten 7 Tage
        const today = new Date();
        const simulatedData = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);

            const phValue = (Math.random() * (8.5 - 5.5) + 5.5).toFixed(2); // pH-Werte zwischen 5.5 und 8.5

            simulatedData.push({
                field_id: fieldId,
                date: date.toISOString().split("T")[0],
                ph_value: parseFloat(phValue),
            });
        }

        // Lösche alte Einträge und füge simulierte Werte ein
        await db("field_ph_history").where("field_id", fieldId).del();
        await db("field_ph_history").insert(simulatedData);

        res.json({ message: "pH-Werte erfolgreich simuliert.", simulatedData });
    } catch (err) {
        console.error("Fehler beim Simulieren der pH-Werte:", err);
        res.status(500).json({ error: "Fehler beim Simulieren der pH-Werte." });
    }
});


export default router;
