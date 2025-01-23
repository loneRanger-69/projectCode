import db from "./db.js";

async function migrate() {
    try {
        const exists = await db.schema.hasTable("fields");
        if (!exists) {
            // Tabelle erstellen
            await db.schema.createTable("fields", (table) => {
                table.increments("id").primary();
                table.string("name", 255).notNullable();
                table.integer("size").notNullable();
                table.string("status", 50).notNullable();
                table.float("ph_value").defaultTo(null);
                table.float("moisture").defaultTo(null);
                table.float("nutrients").defaultTo(null);
                table.float("crop").defaultTo(null);
            });
            console.log("Tabelle 'fields' erfolgreich erstellt.");
        } else {
            // Einzelne Spalten prüfen und hinzufügen
            const columnInfo = await db("fields").columnInfo();

            if (!columnInfo.ph_value) {
                await db.schema.alterTable("fields", (table) => {
                    table.float("ph_value").defaultTo(null);
                });
                console.log("Spalte 'ph_value' erfolgreich hinzugefügt.");
            }
            if (!columnInfo.moisture) {
                await db.schema.alterTable("fields", (table) => {
                    table.float("moisture").defaultTo(null);
                });
                console.log("Spalte 'moisture' erfolgreich hinzugefügt.");
            }
            if (!columnInfo.nutrients) {
                await db.schema.alterTable("fields", (table) => {
                    table.float("nutrients").defaultTo(null);
                });
                console.log("Spalte 'nutrients' erfolgreich hinzugefügt.");
            }

            if (!columnInfo.crop) {
                await db.schema.alterTable("fields", (table) => {
                    table.string("crop").defaultTo(null); // Neue Spalte für Saatgut
                });
                console.log("Spalte 'crop' erfolgreich hinzugefügt.");
            }

        }
    } catch (err) {
        console.error("Fehler beim Migrieren der Tabelle:", err);
    }
}

migrate();
