import knex from "knex";

const db = knex({
    client: "sqlite3",
    connection: {
        filename: "./src/database.sqlite", // Relativer Pfad zur SQLite-Datei
    },
    useNullAsDefault: true, // Notwendig für SQLite
});

export default db;