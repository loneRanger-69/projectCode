import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="w-full bg-gray-800 text-white p-4 flex items-center justify-between fixed top-0 left-0 z-50">
            {/* Logo-Bereich links */}
            <div className="flex items-center gap-2">
                <img
                    src="/assets/images/logo.png"
                    alt="Logo"
                    className="h-8 w-8"
                />
                <span className="text-lg font-bold">Agriculture Dashboard</span>
            </div>

            {/* Navigations-Links mittig */}
            <div className="flex-1 flex justify-center">
                <div className="flex gap-6">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/fields" className="hover:text-gray-300">Felder</Link>
                    <Link to="/environment" className="hover:text-gray-300">Umweltdaten</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
