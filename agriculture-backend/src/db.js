//Code von Victor Bestea - 752622

// Importiere das Knex-Modul, das als SQL-Query-Builder dient
import knex from "knex";

// Initialisiere die Datenbankverbindung mit SQLite
const db = knex({
    client: "sqlite3", // Gibt an, dass SQLite als Datenbank-Client verwendet wird
    connection: {
        filename: "./src/database.sqlite", // Relativer Pfad zur SQLite-Datenbankdatei
    },
    useNullAsDefault: true, // Setzt NULL als Standardwert für nicht definierte Felder (notwendig für SQLite)
});

// Exportiere die Datenbankverbindung, um sie in anderen Modulen des Projekts zu verwenden
export default db;