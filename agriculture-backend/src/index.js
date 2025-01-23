import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fieldRoutes from "./routes/fields.js";
import analysisRoutes from "./routes/analysis.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Erlaubt Cross-Origin-Anfragen
app.use(bodyParser.json()); // Verarbeitet JSON-Anfragen

// Routen
app.use("/fields", fieldRoutes);
app.use("/analysis", analysisRoutes);

// Fehlerbehandlung für nicht gefundene Routen
app.use((req, res, next) => {
    res.status(404).json({ error: "Route nicht gefunden" });
});

// Allgemeine Fehlerbehandlung
app.use((err, req, res, next) => {
    console.error("Serverfehler:", err);
    res.status(500).json({ error: "Interner Serverfehler" });
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
