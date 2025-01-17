import db from "./db.js"; // Falls du CommonJS verwendest, nutze `const db = require("./db");`

// Funktion zur Erstellung oder Änderung der Tabelle
async function migrate() {
    try {
        // Prüfen, ob die Tabelle existiert
        const exists = await db.schema.hasTable("fields");
        if (!exists) {
            // Tabelle erstellen
            await db.schema.createTable("fields", (table) => {
                table.increments("id").primary();
                table.string("name", 255).notNullable();
                table.integer("size").notNullable();
                table.string("status", 50).notNullable();
                table.float("ph_value").defaultTo(null); // pH-Wert hinzufügen
                table.float("moisture").defaultTo(null); // Feuchtigkeit hinzufügen
                table.float("nutrients").defaultTo(null); // Nährstoffe hinzufügen
            });
            console.log("Tabelle 'fields' erfolgreich erstellt.");
        } else {
            // Spalten einzeln prüfen und bei Bedarf hinzufügen
            const columnInfo = await db("fields").columnInfo();

            if (!columnInfo.ph_value) {
                await db.schema.alterTable("fields", (table) => {
                    table.float("ph_value").defaultTo(null); // pH-Wert hinzufügen
                });
                console.log("Spalte 'ph_value' erfolgreich hinzugefügt.");
            }
            if (!columnInfo.moisture) {
                await db.schema.alterTable("fields", (table) => {
                    table.float("moisture").defaultTo(null); // Feuchtigkeit hinzufügen
                });
                console.log("Spalte 'moisture' erfolgreich hinzugefügt.");
            }
            if (!columnInfo.nutrients) {
                await db.schema.alterTable("fields", (table) => {
                    table.float("nutrients").defaultTo(null); // Nährstoffe hinzufügen
                });
                console.log("Spalte 'nutrients' erfolgreich hinzugefügt.");
            }
        }
    } catch (err) {
        console.error("Fehler beim Migrieren der Tabelle:", err);
    } finally {
    }
}

// Migration ausführen
migrate();
