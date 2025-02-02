//Code von Victor Bestea - 752622

// src/index.js

// Importiere erforderliche Module und Middleware
import express from "express"; // Express-Framework zur Erstellung des Servers
import cors from "cors"; // Middleware zur Ermöglichung von Cross-Origin-Anfragen
import bodyParser from "body-parser"; // Middleware zur Verarbeitung von JSON-Daten in Anfragen
import dotenv from "dotenv"; // Ermöglicht das Laden von Umgebungsvariablen aus einer .env-Datei

// Importiere die definierten Routen für verschiedene API-Endpunkte
import fieldRoutes from "./routes/fields.js"; // Routen für Felddaten
import analysisRoutes from "./routes/analysis.js"; // Routen für Analysen
import kpisRoutes from "./routes/kpis.js"; // Routen für Key Performance Indicators (KPIs)
import todoRoutes from "./routes/todo.js"; // Routen für Aufgabenverwaltung
import weatherRoutes from "./routes/weather.js"; // Routen für Wetterdaten
import phRoutes from "./routes/ph.js"; // Routen für pH-Werte
import availableResourceRoutes from "./routes/availableResource.js"; // Routen für verfügbare Ressourcen
import developmentResourceRoutes from "./routes/developmentResource.js"; // Routen für Entwicklungsressourcen

// Laden der Umgebungsvariablen aus der angegebenen .env-Datei
dotenv.config({ path: "./agriculture-backend/.env" });
console.log("Geladener API_KEY:", process.env.VITE_APP_WEATHERMAP_API_KEY); // Anzeige des geladenen API-Schlüssels für Wetterdaten

// Initialisiere die Express-Anwendung
const app = express();
const PORT = 5001; // Definiere den Port, auf dem der Server läuft

// Middleware-Konfiguration
app.use(cors()); // Aktiviert CORS, um Anfragen von anderen Domains zuzulassen
app.use(bodyParser.json()); // Ermöglicht die Verarbeitung von JSON-Daten in Anfragen

// Registrierung der Routen für verschiedene API-Endpunkte
app.use("/fields", fieldRoutes); // Routen zur Verwaltung von Felddaten
app.use("/analysis", analysisRoutes); // Routen für Datenanalysen
app.use("/kpis", kpisRoutes); // Routen für Key Performance Indicators
app.use("/todos", todoRoutes); // Routen zur Aufgabenverwaltung
app.use("/weather", weatherRoutes); // Routen für Wetterinformationen
app.use("/ph", phRoutes); // Routen zur Verwaltung von pH-Werten
app.use("/resource-available", availableResourceRoutes); // Routen für verfügbare Ressourcen
app.use("/resource-deployment", developmentResourceRoutes); // Routen für den Einsatz von Ressourcen

// Fehlerbehandlung für nicht gefundene Routen
app.use((req, res, next) => {
    res.status(404).json({ error: "Route nicht gefunden" }); // Gibt einen 404-Fehler zurück, wenn die Route nicht existiert
});

// Allgemeine Fehlerbehandlung für unerwartete Serverfehler
app.use((err, req, res, next) => {
    console.error("Serverfehler:", err); // Protokolliert den Fehler auf dem Server
    res.status(500).json({ error: "Interner Serverfehler" }); // Gibt einen 500-Fehler für interne Serverfehler zurück
});

// Startet den Server und hört auf dem definierten Port
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`); // Bestätigt, dass der Server gestartet wurde
});
