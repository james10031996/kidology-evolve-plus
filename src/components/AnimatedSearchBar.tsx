
import { useState } from 'react';
import { Search, BookOpen, Play, Users, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AnimatedSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const searchSuggestions = [
    { id: 1, title: 'Math Adventure', type: 'Course', icon: '🔢', path: '/courses/math-adventure' },
    { id: 2, title: 'Reading Adventure', type: 'Course', icon: '📚', path: '/courses/reading-adventure' },
    { id: 3, title: 'Science Explorers', type: 'Course', icon: '🔬', path: '/courses/science-explorers' },
    { id: 4, title: 'Number Bubble Pop', type: 'Game', icon: '🎮', path: '/activities/number-bubble-pop' },
    { id: 5, title: 'Shape Sorter', type: 'Game', icon: '🧩', path: '/activities/shape-sorter' },
    { id: 6, title: 'Magic Forest Adventure', type: 'Story', icon: '📖', path: '/activities' },
    { id: 7, title: 'Space Explorer Mission', type: 'Story', icon: '🚀', path: '/activities' },
    { id: 8, title: 'Paint Studio', type: 'Activity', icon: '🎨', path: '/activities' },
    { id: 9, title: 'Music Maker', type: 'Activity', icon: '🎵', path: '/activities' },
    { id: 10, title: 'Courses', type: 'Page', icon: '🎓', path: '/courses' },
    { id: 11, title: 'Activities', type: 'Page', icon: '🎮', path: '/activities' },
    { id: 12, title: 'Progress', type: 'Page', icon: '📊', path: '/progress' }
  ];

  const filteredSuggestions = searchTerm 
    ? searchSuggestions.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchClick = (suggestion: any) => {
    navigate(suggestion.path);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search courses, games, stories..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          onFocus={() => setIsOpen(searchTerm.length > 0)}
          className="w-full pl-10 pr-4 py-3 bg-white rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent font-comic text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Search Results Dropdown with high z-index */}
      {isOpen && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[9999] max-h-96 overflow-y-auto">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() => handleSearchClick(suggestion)}
              className="flex items-center space-x-3 p-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 cursor-pointer transition-all duration-200 border-b border-gray-50 last:border-b-0"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <span className="text-lg">{suggestion.icon}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-comic font-bold text-gray-800">{suggestion.title}</h4>
                <p className="font-comic text-sm text-gray-500">{suggestion.type}</p>
              </div>
              <div className="text-purple-400">
                {suggestion.type === 'Course' && <BookOpen className="w-5 h-5" />}
                {suggestion.type === 'Game' && <Play className="w-5 h-5" />}
                {suggestion.type === 'Story' && <BookOpen className="w-5 h-5" />}
                {suggestion.type === 'Activity' && <Lightbulb className="w-5 h-5" />}
                {suggestion.type === 'Page' && <Users className="w-5 h-5" />}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9998]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default AnimatedSearchBar;
