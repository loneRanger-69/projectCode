import db from "./db.js";

async function migrate() {
    try {
        // Migration für Tabelle 'fields'
        const fieldsExists = await db.schema.hasTable("fields");
        if (!fieldsExists) {
            await db.schema.createTable("fields", (table) => {
                table.increments("id").primary();
                table.string("name", 255).notNullable();
                table.integer("size").notNullable();
                table.string("status", 50).notNullable();
                table.float("ph_value").defaultTo(null);
                table.float("moisture").defaultTo(null);
                table.float("nutrients").defaultTo(null);
                table.string("crop").defaultTo(null); // Neue Spalte für Saatgut
            });
            console.log("Tabelle 'fields' erfolgreich erstellt.");
        } else {
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

        // Migration für Tabelle 'daily_weather'
        const dailyWeatherExists = await db.schema.hasTable("daily_weather");
        if (!dailyWeatherExists) {
            await db.schema.createTable("daily_weather", (table) => {
                table.increments("id").primary();
                table.date("date").notNullable().unique(); // Datum des Tages
                table.float("rain_mm").notNullable(); // Regenmenge in mm
                table.integer("rain_probability").notNullable(); // Regenwahrscheinlichkeit in %
            });
            console.log("Tabelle 'daily_weather' erfolgreich erstellt.");
        }

        // Migration für Tabelle 'field_ph_history'
        const phHistoryExists = await db.schema.hasTable("field_ph_history");
        if (!phHistoryExists) {
            await db.schema.createTable("field_ph_history", (table) => {
                table.increments("id").primary(); // Primärschlüssel
                table.integer("field_id").notNullable().references("id").inTable("fields").onDelete("CASCADE");
                table.date("date").notNullable(); // Datum der pH-Wert-Messung
                table.float("ph_value").notNullable(); // Gemessener pH-Wert
                table.unique(["field_id", "date"]); // Eindeutige Kombination aus Feld-ID und Datum
            });
            console.log("Tabelle 'field_ph_history' erfolgreich erstellt.");
        }

    } catch (err) {
        console.error("Fehler beim Migrieren der Tabellen:", err);
    } finally {
        // Schließe die Verbindung zur Datenbank
        await db.destroy();
    }
}

migrate();
