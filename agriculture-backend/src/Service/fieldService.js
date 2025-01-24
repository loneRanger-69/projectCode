// src/Service/fieldService.js

import db from "../db.js";

/**
 * Neues Feld erstellen (automatisch in DB speichern)
 * Falls bestimmte Felder nicht gesetzt sind, kannst du Standardwerte zuweisen.
 */
export async function createField(fieldData) {
    // Beispiel: Wenn "crop" fehlt oder null ist, setze "crop" automatisch auf "Apfel"
    if (!fieldData.crop) {
        fieldData.crop = "Apfel";
    }
    // Genauso kannst du "status" oder "ph_value" etc. defaulten:
    // if (!fieldData.status) fieldData.status = "Unbekannt";

    // Jetzt Insert in DB
    const [id] = await db("fields").insert(fieldData);
    // Das [id] kommt zurück, falls du .returning("id") in der DB config möglich ist
    // Bei SQLite ist das "last inserted rowid"

    // Hole das neu erstellte Feld
    const newField = await getFieldById(id);
    return newField;
}

/**
 * Hilfsfunktion: Feld nach ID holen
 */
export async function getFieldById(fieldId) {
    return db("fields").where({ id: fieldId }).first();
}