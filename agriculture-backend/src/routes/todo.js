// src/routes/todo.js
import express from "express";
import db from "../db.js"; // Deine Knex-/DB-Instanz

const router = express.Router();

/**
 * GET /todos
 * Gibt ein Array der vorhandenen ToDos zurück, z.B. [{id, text, completed}, ...]
 */
router.get("/", async (req, res) => {
  try {
    const todos = await db("todos").select("*");
    res.json(todos);
  } catch (error) {
    console.error("Fehler bei GET /todos:", error);
    res.status(500).json({ error: "Fehler beim Abrufen der ToDo-Liste" });
  }
});

/**
 * POST /todos
 * Legt ein neues ToDo an.
 * Erwartet im Body: { text: string, completed: boolean }
 */
router.post("/", async (req, res) => {
  try {
    const { text, completed } = req.body;
    // Sicherstellen, dass 'completed' als Boolean gespeichert wird
    const [id] = await db("todos").insert({ text, completed: !!completed });
    const newTodo = await db("todos").where({ id }).first();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Fehler bei POST /todos:", error);
    res.status(500).json({ error: "Fehler beim Anlegen eines ToDos" });
  }
});

/**
 * PUT /todos/:id
 * Aktualisiert ein ToDo (z.B. completed-Status).
 * Erwartet im Body: { text, completed }
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  try {
    // DB-Eintrag mit passender id updaten:
    await db("todos").where({ id }).update({ text, completed });
    // Zurückgeben, was jetzt in DB steht:
    const updated = await db("todos").where({ id }).first();
    if (!updated) {
      return res.status(404).json({ error: "Aufgabe nicht gefunden" });
    }
    res.json(updated);
  } catch (error) {
    console.error("Fehler bei PUT /todos/:id:", error);
    res.status(500).json({ error: "Fehler beim Aktualisieren der Aufgabe" });
  }
});

/**
 * DELETE /todos/:id
 * Löscht ein ToDo.
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await db("todos").where({ id }).del();
    if (rows === 0) {
      return res.status(404).json({ error: "Aufgabe nicht gefunden" });
    }
    res.status(204).send(); // Kein Inhalt, aber erfolgreich
  } catch (error) {
    console.error("Fehler bei DELETE /todos/:id:", error);
    res.status(500).json({ error: "Fehler beim Löschen der Aufgabe" });
  }
});

export default router;