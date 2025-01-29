import express from "express";
import db from "../db.js"; // Knex-Instanz importieren

const router = express.Router();

// GET-Route zum Abrufen aller Ressourcen
router.get('/resources', async (req, res) => {
  try {
    // Alle Datensätze aus der Tabelle 'development_resource' abrufen
    const resources = await db('development_resource').select('*');
    
    // Wenn Ressourcen gefunden werden, zurückgeben
    if (resources.length > 0) {
      res.json(resources);
    } else {
      res.status(404).json({ message: "Keine Ressourcen gefunden." });
    }
  } catch (error) {
    // Fehlerbehandlung, falls etwas schief geht
    console.error(error);
    res.status(500).json({ message: "Fehler beim Abrufen der Daten." });
  }
});

// DELETE-Route zum Löschen einer Ressource
router.delete('/resources/:id', async (req, res) => {
    const { id } = req.params; // Die ID aus den URL-Parametern holen
    try {
      const result = await db('development_resource').where({ ID: id }).del();
      if (result) {
        res.status(200).json({ message: `Ressource mit ID ${id} wurde gelöscht.` });
      } else {
        res.status(404).json({ message: `Ressource mit ID ${id} nicht gefunden.` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Fehler beim Löschen der Ressource." });
    }
  });

  // UPDATE-Route zum Aktualisieren einer Ressource
router.put('/resources/:id', async (req, res) => {
    const { id } = req.params; // Die ID aus den URL-Parametern holen
    const { Wasser, Düngemittel, FeldName } = req.body; // Die neuen Werte aus dem Body holen
    try {
      const result = await db('development_resource')
        .where({ ID: id })
        .update({ Wasser, Düngemittel, FeldName });
  
      if (result) {
        res.status(200).json({ message: `Ressource mit ID ${id} wurde aktualisiert.` });
      } else {
        res.status(404).json({ message: `Ressource mit ID ${id} nicht gefunden.` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Fehler beim Aktualisieren der Ressource." });
    }
  });

// POST-Route zum Hinzufügen einer neuen Ressource
router.post('/add', async (req, res) => {
    const { Wasser, Düngemittel, FeldName } = req.body; // Die neuen Werte aus dem Body holen
    try {
      // Neue Ressource in der Tabelle 'development_resource' hinzufügen
      const [newResourceId] = await db('development_resource')
        .insert({ Wasser, Düngemittel, FeldName })
        .returning('ID'); // ID der neu hinzugefügten Ressource zurückgeben
  
      res.status(201).json({ message: `Ressource wurde hinzugefügt. ID: ${newResourceId}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Fehler beim Hinzufügen der Ressource." });
    }
  });

router.get("/", (req, res) => {
    res.send("Ressourcen für die Entwicklung");
  });

// GET-Route für den Gesamtbetrag von Wasser und Düngemittel
router.get('/total', async (req, res) => {
    try {
      // Summiere die Werte für Wasser und Düngemittel in der Tabelle 'development_resource'
      const totals = await db('development_resource')
        .sum({ totalWasser: 'Wasser', totalDungemittel: 'Düngemittel' });
  
      // Prüfen, ob Daten vorhanden sind
      if (totals.length > 0) {
        // Erfolgreiche Antwort mit den Summen von Wasser und Düngemittel
        res.status(200).json({
          totalWasser: totals[0].totalWasser || 0,
          totalDungemittel: totals[0].totalDungemittel || 0
        });
      } else {
        res.status(404).json({ message: "Keine Daten gefunden." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Fehler beim Berechnen der Gesamtwerte." });
    }
  });
export default router;