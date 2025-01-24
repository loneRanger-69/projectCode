import { useState, useEffect } from "react";
import axios from "axios";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState("");

  // ToDos aus der Datenbank abrufen
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const response = await axios.get("http://localhost:5001/todos");
      setTodos(response.data);
    } catch (err) {
      console.error("Fehler beim Laden der ToDos:", err);
    }
  }

  // Neue Aufgabe hinzufügen
  async function handleAddTodo() {
    if (newTodo.trim() === "") {
      alert("Bitte geben Sie eine Aufgabe ein!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5001/todos", {
        text: newTodo,
        completed: false,
      });
      setTodos([...todos, response.data]); // Lokale Liste aktualisieren
      setNewTodo(""); // Eingabefeld zurücksetzen
      setShowModal(false); // Modal schließen
    } catch (err) {
      console.error("Fehler beim Hinzufügen einer neuen Aufgabe:", err);
    }
  }

  // Aufgabe als erledigt/unerledigt umschalten
  async function handleToggleComplete(index) {
    const oldTodo = todos[index];
    const updated = { ...oldTodo, completed: !oldTodo.completed };

    try {
      await axios.put(`http://localhost:5001/todos/${updated.id}`, updated);
      const newList = [...todos];
      newList[index] = updated;
      setTodos(newList);
    } catch (err) {
      console.error("Fehler beim Aktualisieren der Aufgabe:", err);
    }
  }

  // Aufgabe löschen
  async function handleDeleteTodo() {
    if (!selectedDeleteId) {
      alert("Bitte wählen Sie eine Aufgabe aus!");
      return;
    }
    try {
      await axios.delete(`http://localhost:5001/todos/${selectedDeleteId}`); // Lösche aus DB
      setTodos(todos.filter((todo) => todo.id !== selectedDeleteId)); // Lokale Liste aktualisieren
      setDeleteModal(false); // Modal schließen
      setSelectedDeleteId(""); // Auswahl zurücksetzen
    } catch (err) {
      console.error("Fehler beim Löschen der Aufgabe:", err);
    }
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-md relative">
      <h2 className="text-lg font-bold mb-2">Offene Aufgaben</h2>

      {/* Delete Task Button */}
      <button
        onClick={() => setDeleteModal(true)}
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete Task
      </button>

      {/* Aufgabenliste */}
      <ul className="space-y-1">
        {todos.map((todo, index) => (
          <li key={todo.id} className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(index)}
              className="mr-2 cursor-pointer"
            />
            <span className={todo.completed ? "text-gray-500 line-through" : ""}>
              {todo.text}
            </span>
            {todo.completed && <span className="ml-2 text-green-600 font-bold">✔</span>}
          </li>
        ))}
      </ul>

      {/* "Neue Aufgabe erstellen" Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Neue Aufgabe erstellen
      </button>

      {/* Modal für neue Aufgabe */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-white text-black rounded p-4 w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-2">Neue Aufgabe</h3>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Aufgabe eingeben..."
              className="border border-gray-300 rounded px-2 py-1 w-full mb-3 bg-white text-black"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddTodo}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Hinzufügen
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal für Löschen */}
      {deleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black rounded p-4 w-96">
            <h3 className="text-lg font-bold mb-4">Aufgabe löschen</h3>
            <label className="block mb-2 text-sm font-medium">Wählen Sie eine Aufgabe:</label>
            <select
              value={selectedDeleteId}
              onChange={(e) => setSelectedDeleteId(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 mb-4 bg-white text-black"
            >
              <option value="">Bitte auswählen</option>
              {todos.map((todo) => (
                <option key={todo.id} value={todo.id}>
                  {todo.text}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleDeleteTodo}
                disabled={!selectedDeleteId}
                className={`${
                  selectedDeleteId ? "bg-red-500" : "bg-gray-400"
                } text-white px-4 py-2 rounded`}
              >
                Löschen
              </button>
              <button
                onClick={() => setDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToDoList;