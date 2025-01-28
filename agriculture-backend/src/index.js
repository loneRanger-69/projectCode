// src/index.js

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fieldRoutes from "./routes/fields.js";
import analysisRoutes from "./routes/analysis.js"; // Import der analysisRoutes
import kpisRoutes from "./routes/kpis.js";
import todoRoutes from "./routes/todo.js";
import weatherRoutes from "./routes/weather.js"; // Importiere die Wetter-Routen
import dotenv from "dotenv";
import phRoutes from "./routes/ph.js";


dotenv.config({ path: "./agriculture-backend/.env" });
console.log("Geladener API_KEY:", process.env.VITE_APP_WEATHERMAP_API_KEY);

const app = express();
const PORT = 5001;

// Middleware
app.use(cors()); // Erlaubt Cross-Origin-Anfragen
app.use(bodyParser.json()); // Verarbeitet JSON-Anfragen

// Routen
app.use("/fields", fieldRoutes);
app.use("/analysis", analysisRoutes); // Nutzung der analysisRoutes
app.use("/kpis", kpisRoutes);
app.use("/todos", todoRoutes);
app.use("/weather", weatherRoutes);
app.use("/ph", phRoutes);

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