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


// UPDATE Ressourcen (Wasser & Düngemittel)
router.put("/", async (req, res) => {  
  try {
    console.log("Empfangene Daten:", req.body); // Debugging
    console.log("Typ von Wasser:", typeof req.body.Wasser);
    console.log("Typ von Düngemittel:", typeof req.body.Düngemittel);

    let { Wasser, Düngemittel } = req.body;

    // Sicherstellen, dass die Werte Zahlen sind
    Wasser = Number(Wasser);
    Düngemittel = Number(Düngemittel);

    if (isNaN(Wasser) || isNaN(Düngemittel)) {
      return res.status(400).json({ error: "Nur numerische Werte erlaubt" });
    }

    // Aktualisiere den existierenden Datensatz
    const updatedResource = await db("AvailableResource")
      .update({ Wasser, Düngemittel })
      .where("ID", 1) // Falls nur eine Ressource existiert
      .returning("*");

    if (updatedResource.length === 0) {
      return res.status(404).json({ error: "Eintrag nicht gefunden" });
    }

    res.status(200).json(updatedResource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE Ressource mit bestimmter ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Überprüfe, ob die ID eine gültige Zahl ist
    if (isNaN(id)) {
      return res.status(400).json({ error: "Ungültige ID" });
    }

    const deletedRows = await db("AvailableResource")
      .where({ ID: id })
      .del(); // Löscht den Eintrag

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Eintrag nicht gefunden" });
    }

    res.status(200).json({ message: `Eintrag mit ID ${id} erfolgreich gelöscht` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/total", async (req, res) => {
  try {
    // Abrufen des Datensatzes mit ID 1
    const resource = await db("AvailableResource")
      .select("Wasser", "Düngemittel")
      .where("ID", 1) // Nur Ressource mit ID 1

    if (resource.length === 0) {
      return res.status(404).json({ error: "Ressource mit ID 1 nicht gefunden" });
    }

    // Werte von Wasser und Düngemittel als Integer konvertieren
    const totalWasser = parseInt(resource[0].Wasser, 10); // Umwandlung in Integer
    const totalDungemittel = parseInt(resource[0].Düngemittel, 10); // Umwandlung in Integer

    // Gesamte Werte zurückgeben
    res.status(200).json({
      totalWasser,
      totalDungemittel,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;