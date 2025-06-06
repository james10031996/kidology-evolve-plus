
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, BookOpen, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedSearchBar from './AnimatedSearchBar';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="font-fredoka font-bold text-4xl md:text-6xl lg:text-7xl text-gray-800 leading-tight animate-fade-in">
                Fun Learning
                <span className="block gradient-text bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Adventures
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl">
                  for Kids! 🌟
                </span>
              </h1>
              
              <p className="font-comic text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Discover magical stories, play exciting games, and learn amazing things in a safe, colorful world designed just for children!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg"
                onClick={() => navigate('/courses')}
                className="gradient-orange text-white hover:scale-105 transition-transform duration-200 font-comic font-bold text-lg px-8 py-4 rounded-full shadow-lg"
              >
                <BookOpen className="w-6 h-6 mr-2" />
                Start Learning
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/demo')}
                className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 hover:scale-105 transition-all duration-200 font-comic font-bold text-lg px-8 py-4 rounded-full"
              >
                <Play className="w-6 h-6 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Get Started Free Button */}
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button 
                size="lg"
                onClick={() => navigate('/courses')}
                className="gradient-blue text-white hover:scale-105 transition-transform duration-200 font-comic font-bold text-lg px-8 py-4 rounded-full shadow-lg"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                Get Started Free
                <Star className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Search Bar */}
            <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <AnimatedSearchBar />
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl border-4 border-purple-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-200 cursor-pointer" onClick={() => navigate('/activities')}>
                  <div className="text-4xl mb-3 animate-bounce">🎮</div>
                  <h3 className="font-fredoka font-bold text-gray-800">Fun Games</h3>
                  <p className="font-comic text-sm text-gray-600">Interactive learning games</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-200 cursor-pointer" onClick={() => navigate('/activities')}>
                  <div className="text-4xl mb-3 animate-bounce" style={{ animationDelay: '0.5s' }}>📚</div>
                  <h3 className="font-fredoka font-bold text-gray-800">Stories</h3>
                  <p className="font-comic text-sm text-gray-600">Magical adventures await</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-200 cursor-pointer" onClick={() => navigate('/courses')}>
                  <div className="text-4xl mb-3 animate-bounce" style={{ animationDelay: '1s' }}>🎓</div>
                  <h3 className="font-fredoka font-bold text-gray-800">Courses</h3>
                  <p className="font-comic text-sm text-gray-600">Learn step by step</p>
                </div>
                
                <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-200 cursor-pointer" onClick={() => navigate('/activities')}>
                  <div className="text-4xl mb-3 animate-bounce" style={{ animationDelay: '1.5s' }}>🎨</div>
                  <h3 className="font-fredoka font-bold text-gray-800">Create</h3>
                  <p className="font-comic text-sm text-gray-600">Express your creativity</p>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-spin" style={{ animationDuration: '10s' }}>
              ⭐
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-pink-400 rounded-full flex items-center justify-center text-3xl animate-bounce">
              🌈
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl animate-pulse">
              🧠
            </div>
            <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">Interactive Learning</h3>
            <p className="font-comic text-gray-600">Engage with hands-on activities that make learning fun and memorable</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>
              🏆
            </div>
            <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">Achievement System</h3>
            <p className="font-comic text-gray-600">Earn stars, unlock badges, and track progress as you learn</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl animate-pulse" style={{ animationDelay: '1s' }}>
              🛡️
            </div>
            <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">Safe Environment</h3>
            <p className="font-comic text-gray-600">Child-friendly content in a secure, ad-free learning space</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
