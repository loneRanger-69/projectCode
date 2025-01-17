// src/components/Header.jsx

import { React } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-green-600 p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">
                    Agriculture Dashboard
                </Link>
                {/* Weitere Navigationslinks können hier hinzugefügt werden */}
            </nav>
        </header>
    );
}

export default Header;