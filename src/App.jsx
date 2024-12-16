import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Fields from "./pages/Fields";
import Environment from "./pages/Environment";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="pt-16">
                {/* pt-16 fügt oben einen Abstand ein, damit die Seiten nicht unter der Navbar beginnen */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/fields" element={<Fields />} />
                    <Route path="/environment" element={<Environment />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
