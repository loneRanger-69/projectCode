import express from "express";
import db from "../db.js"; // Knex-Instanz importieren

const router = express.Router();

// GET alle Ressourcen
router.get("/", async (req, res) => {
  try {
    const resources = await db("AvailableResource").select("*");
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST neue Ressource
router.post("/", async (req, res) => {
  try {
    const { water, fertilizer } = req.body;
    
    // Validierung
    if (typeof water !== "number" || typeof fertilizer !== "number") {
      return res.status(400).json({ error: "Nur numerische Werte erlaubt" });
    }

    const [newResource] = await db("AvailableResource")
      .insert({
        water,
        fertilizer,
        created_at: db.fn.now() // Zeitstempel hinzufügen
      })
      .returning("*"); // Gibt den neuen Eintrag zurück

    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;