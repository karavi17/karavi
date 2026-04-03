import { Search, BookOpen, TrendingUp, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Navbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-indigo-500" />
              <span className="text-2xl font-bold tracking-tight">Manga<span className="text-indigo-500">Kakalot</span></span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link to="/popular" className="flex items-center space-x-1 hover:text-indigo-400 transition">
                <TrendingUp className="h-4 w-4" />
                <span>Popular</span>
              </Link>
              <Link to="/latest" className="flex items-center space-x-1 hover:text-indigo-400 transition">
                <Clock className="h-4 w-4" />
                <span>Latest</span>
              </Link>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-md ml-8 relative">
            <input
              type="text"
              placeholder="Search manga..."
              className="w-full bg-gray-800 text-gray-100 px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </form>
        </div>
      </div>
    </nav>
  );
};
