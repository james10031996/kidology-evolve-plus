
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Menu, X, Star, Trophy, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { userData } = useUser();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="gradient-orange p-2 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="font-fredoka font-bold text-xl text-gray-800">KidLearn</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/courses" 
              className={cn(
                "font-comic font-medium transition-colors",
                isActive('/courses') ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
              )}
            >
              Courses
            </Link>
            <Link 
              to="/activities" 
              className={cn(
                "font-comic font-medium transition-colors",
                isActive('/activities') ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
              )}
            >
              Activities
            </Link>
            <Link 
              to="/progress" 
              className={cn(
                "font-comic font-medium transition-colors",
                isActive('/progress') ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
              )}
            >
              Progress
            </Link>
            <Link 
              to="/parents" 
              className={cn(
                "font-comic font-medium transition-colors",
                isActive('/parents') ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
              )}
            >
              Parents
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-comic font-bold text-yellow-700">{userData.stars.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
              <Trophy className="w-4 h-4 text-blue-500" />
              <span className="font-comic font-bold text-blue-700">Level {userData.level}</span>
            </div>
            <Button size="sm" className="gradient-orange text-white font-comic font-bold rounded-full">
              <User className="w-4 h-4 mr-2" />
              {userData.name}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
        )}>
          <nav className="flex flex-col space-y-4 pt-4">
            <Link 
              to="/courses" 
              className={cn(
                "font-comic font-medium transition-colors",
                isActive('/courses') ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              to="/activities" 
              className={cn(
                "font-comic font-medium transition-colors",
                isActive('/activities') ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Activities
            </Link>
            <Link 
              to="/progress" 
              className={cn(
                "font-comic font-medium transition-colors",
                isActive('/progress') ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Progress
            </Link>
            <Link 
              to="/parents" 
              className={cn(
                "font-comic font-medium transition-colors",
                isActive('/parents') ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Parents
            </Link>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-comic font-bold text-yellow-700">{userData.stars.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
                  <Trophy className="w-4 h-4 text-blue-500" />
                  <span className="font-comic font-bold text-blue-700">Level {userData.level}</span>
                </div>
              </div>
              <Button size="sm" className="gradient-orange text-white font-comic font-bold rounded-full">
                {userData.name}
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
