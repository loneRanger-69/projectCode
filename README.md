
# 🌱 HCI Agriculture Dashboard

Das HCI Agriculture Dashboard ist eine Webanwendung für landwirtschaftliche Betriebe zur Verwaltung von Felddaten, Sensordaten, Wetterdaten und Analysen.
Die Anwendung bietet eine To-Do-Liste, eine Felder-Verwaltung, Wettervorhersagen, pH-Wert-Verläufe und eine Wasserbedarfs- sowie Nährstoffanalyse.






## 📌 Features

✅ To-Do-Liste für landwirtschaftliche Aufgaben

✅ Ressourcenverwaltung für Düngemittel & Wasser

✅ Verwaltung von Feldern mit Details, Wetter- und Bodenanalyse

✅ Live-Wetterdaten via OpenWeatherMap API

✅ Automatisierte Simulation von Sensordaten (pH-Wert, Feuchtigkeit, Nährstoffe)

✅ pH-Verlauf als interaktives Diagramm mit Chart.js

✅ Berechnung der Wasserbedarfs- und Nährstoffanalyse anhand von Sensordaten

✅ Datenbankgestützte Verwaltung mit SQLite über Knex.js
## 🚀 Tech-Stack

🔹 Frontend: React.js mit Vite, TailwindCSS, Axios, Chart.js

🔹 Backend: Node.js mit Express.js, Knex.js, SQLite

🔹 APIs: OpenWeatherMap API für Wetterdaten

🔹 Datenbank: SQLite für Wetter-, Sensordaten und Felder
## 🏗 Systemarchitektur

Das System besteht aus zwei Hauptkomponenten:

    Frontend (React mit Vite)
        Kommuniziert mit dem Backend über REST-APIs
        Stellt UI-Komponenten für die Benutzerinteraktion bereit
        Nutzt Chart.js zur Visualisierung des pH-Verlaufs

    Backend (Node.js mit Express)
        Verarbeitet API-Anfragen vom Frontend
        Holt Wetterdaten von OpenWeatherMap
        Speichert und verwaltet Daten in einer SQLite-Datenbank über Knex.js
        Berechnet Wasserbedarfs- und Nährstoffanalysen basierend auf Sensordaten
## 🛠 Installation & Setup

1️⃣ Voraussetzungen

    Node.js (Version 16 oder höher empfohlen)
    npm (mit Node.js mitgeliefert)

2️⃣ Repository klonen

 ```bash
git clone <REPO_URL>
cd hci-agriculture-dashboard
```
3️⃣ Abhängigkeiten installieren
```bash
npm install
```
4️⃣ Backend starten
```bash
cd agriculture-backend
node src/index.js
```
5️⃣ Frontend starten
```bash
cd ..
npm run dev
```
6️⃣ OpenWeatherMap API-Key einrichten

    Erstelle eine .env Datei im Hauptverzeichnis
    Füge den API-Key hinzu:
```bash
VITE_APP_WEATHERMAP_API_KEY=8a89e1b64fb101893549ee684e73f02c
```

## 📋 Seiten & Funktionen

### 🏠 Homescreen: To-Do-Liste & Ressourcenverwaltung
To-Do-Liste:

- Aufgaben hinzufügen/bearbeiten

- Aufgaben als erledigt markieren

- Aufgaben löschen

- Ressourcenverwaltung:

- Anzeigen der verfügbaren Ressourcen (Düngemittel & Wasser)

- Neue Ressourcen hinzufügen

- Ressourcen entfernen oder anpassen

API-Endpunkte:
- GET /todos → Ruft alle Aufgaben ab
- POST /todos → Erstellt eine neue Aufgabe
- PUT /todos/:id → Aktualisiert den Status einer Aufgabe
- DELETE /todos/:id → Löscht eine Aufgabe
- GET /resource-available/total → Holt verfügbare Ressourcen
- POST /resource-deployment/add → Fügt neue Ressourcen hinzu
- DELETE /resource-deployment/resources/:id → Entfernt eine Ressource

### 🌾 Felderseite: Felder verwalten & Analysieren

- Übersicht aller Felder anzeigen

- Feldsuche und Filterfunktion

- Felder anzeigen & Details abrufen

- Feld bearbeiten, hinzufügen oder löschen

- Analyse-Funktion für Wasser- & Nährstoffbedarfsberechnung

API-Endpunkte:
- GET /fields → Holt alle Felder
- GET /fields/:id → Holt Details eines Feldes
- POST /fields → Erstellt ein neues Feld
- PUT /fields/:id → Aktualisiert Felddetails
- DELETE /fields/:id → Löscht ein Feld
- POST /fields/simulate → Simuliert Sensordaten für Felder

### 🌦 Umweltdatenseite: Wetterdaten & Sensordatenanalyse

- Live-Wetterdaten von OpenWeatherMap API
- Regenwahrscheinlichkeit (bis jetzt für Januar & Februar in der Datenbank generiert)
- Simulation von Sensordaten (pH-Wert, Feuchtigkeit, Nährstoffe)
- Wasserbedarfs- & Nährstoffanalyse
- pH-Wert-Verlauf als interaktives Diagramm mit Chart.js

🔹 Wetterdaten

Holt aktuelle Temperaturen, Regenwahrscheinlichkeit & Vorhersagen

API-Endpunkte:
- GET /weather/current → Holt aktuelle Wetterdaten
- GET /weather/forecast → Holt 5-Tage-Wettervorhersage
- GET /weather-data → Ruft gespeicherte Wetterdaten ab

🔹 Wasserbedarfsanalyse

Berechnet die notwendige Bewässerung anhand von:

- Regenwahrscheinlichkeit
- Temperatur
- Bodenfeuchte
- Pflanzenart & Feldgröße

Formel:

```bash
const baseNeed = cropBaseWaterNeed[crop] || 25;
const rainAdjustment = (rainProbability / 100) * -baseNeed * 0.8;
const temperatureAdjustment = temperature > 25 ? (temperature - 25) * 2 : 0;
const soilMoistureAdjustment = field.moisture < 30 ? 10 : 0;

const waterNeedPerHectare = Math.max(0, baseNeed + rainAdjustment + temperatureAdjustment + soilMoistureAdjustment);
const totalWaterNeed = field.size * waterNeedPerHectare;
```

🔹 Nährstoffanalyse

- Vergleicht aktuelle Bodenwerte mit optimalen Werten aus cropOptimalValues.js 
- Berechnet notwendige Anpassungen für pH-Wert & Nährstoffe.

Formel:

```bash
const nutrientAdjustment = optimalNutrients - field.nutrients;
const phAdjustment = optimalPh - field.ph_value;
```

🔹 pH-Wert-Verlauf

- Speichert pH-Daten in field_ph_history
- Wird als Diagramm mit Chart.js visualisiert
- Neue Werte können durch Simulation generiert werden

API-Endpunkte:

- GET /ph/history/:fieldId → Holt pH-Verlauf für ein Feld
- POST /ph/simulate/:fieldId → Simuliert pH-Daten für ein Feld
## 🚀 Release Notes

### 📢 Version 1.0.0 (Final Release)

✅ Neue Features:

    To-Do-Listen-Funktionalität
    Ressourcenauslastung
    pH-Verlauf mit Chart.js visualisiert
    Wasserbedarfs- & Nährstoffanalyse implementiert

✅ Bugfixes & Verbesserungen:

    Fix für Sensordaten-Simulation
    Verbesserte Analyseformeln für genauere Berechnungen
    UI-Optimierungen für Dropdown-Menüs und Buttons
    Anpassung der Navbar-Farbe für bessere Sichtbarkeit
    

## 📌 Fazit

Das HCI Agriculture Dashboard bietet eine umfassende Lösung zur Datenverwaltung und Analyse für landwirtschaftliche Betriebe.
Mit To-Do-Listen, Felderverwaltung, Sensordatensimulation & Wetterintegration hilft die App Landwirten, fundierte Entscheidungen zu treffen.

Falls du Änderungen brauchst, sag einfach Bescheid! 😊