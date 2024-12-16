import { useState } from "react";

function ToDoList() {
    const [todos, setTodos] = useState(["Ernte planen", "Maschinen warten"]);

    return (
        <div className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-2">Offene Aufgaben</h2>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index} className="mb-1">{`- ${todo}`}</li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
