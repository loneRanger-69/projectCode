// Importiere die Datenbankverbindung aus der db.js-Datei
import db from "./db.js";

// Füge Testdaten in die 'fields'-Tabelle ein
db("fields")
    .insert([
        { name: "Sojabohnen", size: 15, status: "Bepflanzt" },        // Fügt ein Feld mit Sojabohnen hinzu
        { name: "Weizen", size: 10, status: "Brachliegend" },         // Fügt ein Feld mit Weizen hinzu, das momentan nicht genutzt wird
        { name: "Frühlingszwiebeln", size: 8, status: "Erntebereit" } // Fügt ein Feld mit Frühlingszwiebeln hinzu, das bereit zur Ernte ist
    ])
    .then(() => {
        console.log("Testdaten erfolgreich hinzugefügt."); // Erfolgsnachricht nach erfolgreichem Einfügen
    })
    .catch((err) => {
        console.error("Fehler beim Einfügen der Testdaten:", err); // Fehlermeldung, falls das Einfügen scheitert
    });
