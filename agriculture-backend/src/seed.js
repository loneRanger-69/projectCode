import db from "./db.js";

db("fields")
    .insert([
        { name: "Sojabohnen", size: 15, status: "Bepflanzt" },
        { name: "Weizen", size: 10, status: "Brachliegend" },
        { name: "Frühlingszwiebeln", size: 8, status: "Erntebereit" },
    ])
    .then(() => {
        console.log("Testdaten erfolgreich hinzugefügt.");
    })
    .catch((err) => {
        console.error("Fehler beim Einfügen der Testdaten:", err);
    });
