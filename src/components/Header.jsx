import React from 'react';
import { Moon, Sun, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isDark, setIsDark] = React.useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-white">MetaBlog</Link>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search posts..."
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-64"
              />
            </div>
            
            <nav className="flex items-center gap-6 text-gray-300">
              <Link to="/" className="hover:text-white">Home</Link>
              <Link to="/create" className="hover:text-white">Write</Link>
              <Link to="/about" className="hover:text-white">About</Link>
            </nav>

            <button
              onClick={toggleTheme}
              className="p-2 text-gray-300 hover:text-white"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;