
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Gamepad2, Trophy, Users, Star, ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-fredoka font-bold text-5xl md:text-7xl text-gray-800 mb-6">
              Welcome to <span className="gradient-text">KidLearn</span>! 🌟
            </h1>
            <p className="font-comic text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Where learning becomes an exciting adventure! Join thousands of kids exploring, 
              creating, and discovering amazing things every day.
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button className="gradient-orange text-white font-comic font-bold px-8 py-4 text-lg rounded-full">
                  <Star className="w-5 h-5 mr-2" />
                  Start Learning Free
                </Button>
                <Button variant="outline" className="font-comic font-bold px-8 py-4 text-lg rounded-full">
                  Watch Demo
                </Button>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="font-fredoka font-bold text-3xl text-blue-600">1000+</div>
                <div className="font-comic text-gray-600">Happy Kids</div>
              </div>
              <div className="text-center">
                <div className="font-fredoka font-bold text-3xl text-green-600">50+</div>
                <div className="font-comic text-gray-600">Fun Activities</div>
              </div>
              <div className="text-center">
                <div className="font-fredoka font-bold text-3xl text-purple-600">25+</div>
                <div className="font-comic text-gray-600">Learning Games</div>
              </div>
              <div className="text-center">
                <div className="font-fredoka font-bold text-3xl text-orange-600">100%</div>
                <div className="font-comic text-gray-600">Safe & Fun</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Navigation Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-gray-800 mb-4">
              Choose Your Learning Adventure! 🚀
            </h2>
            <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
              Pick what you want to explore today - structured courses or fun activities!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Courses Card */}
            <Link to="/courses">
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 group cursor-pointer">
                <div className="text-center">
                  <div className="w-20 h-20 gradient-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
                    📚 Learning Courses
                  </h3>
                  
                  <p className="font-comic text-gray-600 mb-6 text-lg">
                    Structured lessons in Math, English, Science,
                    Art and more! Track your progress and earn rewards.
                  </p>
                  
                  <Button className="gradient-blue text-white font-comic font-bold px-6 py-2 rounded-full group-hover:scale-105 transition-all duration-300">
                    Explore Courses <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </Link>
            
            {/* Activities Card */}
            <Link to="/activities">
              <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 group cursor-pointer">
                <div className="text-center">
                  <div className="w-20 h-20 gradient-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
                    🎨 Fun Activities
                  </h3>
                  
                  <p className="font-comic text-gray-600 mb-6 text-lg">
                    Interactive stories, creative projects, painting,
                    music and fun educational activities!
                  </p>
                  
                  <Button className="gradient-purple text-white font-comic font-bold px-6 py-2 rounded-full group-hover:scale-105 transition-all duration-300">
                    Try Activities <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </Link>
          </div>
          
          {/* Games Card */}
          <div className="max-w-4xl mx-auto mt-8">
            <Link to="/games">
              <Card className="p-8 bg-gradient-to-br from-green-50 to-teal-100 rounded-3xl shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 group cursor-pointer">
                <div className="text-center">
                  <div className="w-20 h-20 gradient-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Gamepad2 className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
                    🎮 Educational Games
                  </h3>
                  
                  <p className="font-comic text-gray-600 mb-6 text-lg">
                    Have fun while learning with our collection of educational games!
                    Challenge yourself with math puzzles, language games, memory challenges and more.
                  </p>
                  
                  <Button className="gradient-green text-white font-comic font-bold px-6 py-2 rounded-full group-hover:scale-105 transition-all duration-300">
                    Play Games <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-gray-800 mb-4">
              Why KidLearn is Special 💫
            </h2>
            <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
              Designed with kids in mind, our platform makes learning a joyful experience
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 bg-white rounded-2xl shadow-lg text-center">
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">Rewards System</h3>
              <p className="font-comic text-sm text-gray-600">
                Earn stars and unlock achievements as you learn and play
              </p>
            </Card>
            
            <Card className="p-6 bg-white rounded-2xl shadow-lg text-center">
              <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">Interactive Content</h3>
              <p className="font-comic text-sm text-gray-600">
                Engaging animations, games, and stories that make learning fun
              </p>
            </Card>
            
            <Card className="p-6 bg-white rounded-2xl shadow-lg text-center">
              <Star className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">Progress Tracking</h3>
              <p className="font-comic text-sm text-gray-600">
                See how you're improving with detailed progress reports
              </p>
            </Card>
            
            <Card className="p-6 bg-white rounded-2xl shadow-lg text-center">
              <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">Parent Dashboard</h3>
              <p className="font-comic text-sm text-gray-600">
                Parents can monitor activity and customize learning experience
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 md:p-12 shadow-xl mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-white mb-4">
                Ready to Start an Amazing Learning Adventure?
              </h2>
              <p className="font-comic text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join thousands of kids discovering the joy of learning every day!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-indigo-600 hover:bg-indigo-50 font-comic font-bold text-lg px-8 py-4 rounded-full">
                  <Star className="w-5 h-5 mr-2" />
                  Get Started Free
                </Button>
                {user && (
                  <Link to="/courses">
                    <Button className="gradient-orange text-white font-comic font-bold text-lg px-8 py-4 rounded-full">
                      Continue Learning
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
