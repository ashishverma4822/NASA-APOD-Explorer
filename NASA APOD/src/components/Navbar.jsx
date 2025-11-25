import { Rocket, Grid, Search, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path 
    ? "text-blue-400 border-b-2 border-blue-400" 
    : "text-gray-300 hover:text-white";

  return (
    <nav className="bg-space-blue/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Rocket className="h-8 w-8 text-blue-500" />
            <span className="font-bold text-xl tracking-wider hidden sm:block">APOD EXPLORER</span>
          </Link>
          
          <div className="flex space-x-6">
            <Link to="/" className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${isActive('/')}`}>
              <Home size={18} /> <span className="hidden sm:inline">Home</span>
            </Link>
            <Link to="/gallery" className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${isActive('/gallery')}`}>
              <Grid size={18} /> <span className="hidden sm:inline">Gallery</span>
            </Link>
            <Link to="/search" className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${isActive('/search')}`}>
              <Search size={18} /> <span className="hidden sm:inline">Search</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;