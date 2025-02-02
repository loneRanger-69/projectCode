// src/components/Navbar/Navbar.jsx Dieser Code wurde bearbeitet von Philipp Pister

import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="w-full bg-orange-500 text-black font-bold p-4 flex items-center justify-between fixed top-0 left-0 z-50">
            {/* Logo-Bereich links */}
            <div className="flex items-center gap-2">
                <img
                    src="/assets/images/logo.png"
                    alt="Logo"
                    className="h-8 w-8"
                />
                {/* "Agriculture Dashboard" als Link zur Startseite */}
                <Link to="/" className="text-lg font-bold text-black hover:text-white">
                    Agriculture Dashboard
                </Link>
            </div>

            {/* Navigations-Links mittig */}
            <div className="flex-1 flex justify-center">
                <div className="flex gap-6">
                    <Link to="/" className="text-black hover:text-white">Home</Link>
                    <Link to="/fields" className="text-black hover:text-white">Felder</Link>
                    <Link to="/environment" className="text-black hover:text-white">Umweltdaten</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
