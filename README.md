# HCI Agriculture Dashboard

Dieses Projekt ist ein React-Dashboard für landwirtschaftliche Betriebe.  
Es nutzt [Vite](https://vitejs.dev/) als Build-Tool und [Tailwind CSS](https://tailwindcss.com/) für das Styling und [PropTypes](https://www.npmjs.com/package/prop-types) für die Laufzeit-Validierung von Component-Props.

## Voraussetzungen

- **Node.js** (Version 16 oder höher empfohlen)
- **npm** (wird meist mit Node.js mitgeliefert)

## Installation

1. **Repository klonen** (per Git) oder als ZIP herunterladen:
   ```bash
   git clone <REPO_URL>
   cd hci-agriculture-dashboard

2. **Abhängigkeiten installieren**:
   ```bash
   npm install

**PropTypes-Hinweis**

Wir verwenden PropTypes, um die Props unserer React-Komponenten zur Laufzeit zu validieren.

   ```bash
   npm install prop-types
```

3. **WetterAPI abfragen**:

Wir verwenden Axios, um die HTTP-Anfragen durchzuführen

   ```bash
   npm install axios
```
Man muss erstmal .env Datei in einem Verzeichnis erstellen, wo package.json sich befindet

Dann muss dieser API Schlüssel 'VITE_APP_WEATHERMAP_API_KEY=8a89e1b64fb101893549ee684e73f02c' in .env kopiert werden.