
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play, Sparkles, Zap, Heart } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 py-16 md:py-24">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 floating">
          <div className="w-16 h-16 gradient-blue rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="absolute top-32 right-16 floating-delayed">
          <div className="w-12 h-12 gradient-green rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-24 left-1/4 floating">
          <div className="w-20 h-20 gradient-purple rounded-full flex items-center justify-center">
            <Zap className="w-10 h-10 text-white" />
          </div>
        </div>
        <div className="absolute top-16 right-1/3 bounce-gentle">
          <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
        </div>
        <div className="absolute bottom-16 right-20 pulse-soft">
          <div className="w-6 h-6 bg-pink-400 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-comic font-bold text-sm mb-6">
              🎉 Welcome to Learning Adventure!
            </div>
            
            <h1 className="font-fredoka font-bold text-4xl md:text-6xl text-gray-800 mb-6 leading-tight">
              Learn, Play &{' '}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Grow
              </span>{' '}
              Together!
            </h1>
            
            <p className="font-comic text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Join thousands of kids on an exciting educational journey with interactive lessons, fun activities, and amazing rewards!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/courses">
                <Button 
                  size="lg" 
                  className="gradient-orange text-white font-comic font-bold text-lg px-8 py-6 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
                >
                  Start Learning Now
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Link to="/activities">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="font-comic font-bold text-lg px-8 py-6 rounded-full border-2 border-orange-300 text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-200"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12">
              <div className="text-center">
                <div className="font-fredoka font-bold text-2xl text-orange-500">50K+</div>
                <div className="font-comic text-gray-600">Happy Kids</div>
              </div>
              <div className="text-center">
                <div className="font-fredoka font-bold text-2xl text-blue-500">1000+</div>
                <div className="font-comic text-gray-600">Fun Lessons</div>
              </div>
              <div className="text-center">
                <div className="font-fredoka font-bold text-2xl text-green-500">95%</div>
                <div className="font-comic text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Link to="/courses" className="gradient-orange rounded-xl p-4 text-center hover:scale-105 transition-transform">
                    <div className="text-white text-2xl mb-2">🔤</div>
                    <div className="text-white font-comic font-bold">ABC</div>
                  </Link>
                  <Link to="/courses" className="gradient-blue rounded-xl p-4 text-center hover:scale-105 transition-transform">
                    <div className="text-white text-2xl mb-2">🔢</div>
                    <div className="text-white font-comic font-bold">123</div>
                  </Link>
                  <Link to="/activities" className="gradient-green rounded-xl p-4 text-center hover:scale-105 transition-transform">
                    <div className="text-white text-2xl mb-2">🎨</div>
                    <div className="text-white font-comic font-bold">Art</div>
                  </Link>
                  <Link to="/activities" className="gradient-purple rounded-xl p-4 text-center hover:scale-105 transition-transform">
                    <div className="text-white text-2xl mb-2">🧬</div>
                    <div className="text-white font-comic font-bold">Science</div>
                  </Link>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl animate-bounce">
                    😊
                  </div>
                  <Link to="/courses">
                    <div className="font-fredoka font-bold text-gray-800 hover:text-orange-500 transition-colors cursor-pointer">
                      Ready to Learn?
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
