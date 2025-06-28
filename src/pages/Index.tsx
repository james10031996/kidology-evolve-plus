
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Gamepad2, Trophy, Users, Star, ArrowRight, Sparkles, Palette, Music, Beaker, Globe, Heart, Zap, Gift } from 'lucide-react';
import Header from '@/components/home/Header';
import AnimatedSearchBar from '@/components/home/AnimatedSearchBar';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-30 animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-200 rounded-full opacity-25 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-bounce delay-500"></div>

        {/* Floating Icons */}
        <div className="absolute top-20 right-40 animate-float">
          <Star className="w-8 h-8 text-yellow-400 opacity-60" />
        </div>
        <div className="absolute top-60 left-40 animate-float delay-1000">
          <Heart className="w-6 h-6 text-pink-400 opacity-50" />
        </div>
        <div className="absolute bottom-60 right-60 animate-float delay-2000">
          <Sparkles className="w-7 h-7 text-purple-400 opacity-60" />
        </div>
      </div>

      <Header />

      {/* Enhanced Hero Section */}
      <section className="py-20 text-center relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Animated Title */}
            <div className="relative mb-8">
              <h1 className="font-fredoka font-bold text-5xl md:text-7xl text-gray-800 mb-6 animate-fade-in">
                Welcome to <span className="gradient-text relative inline-block">
                  KidLearn
                  <Sparkles className="absolute -top-2 -right-6 w-8 h-8 text-yellow-400 animate-spin" />
                </span>! 🌟
              </h1>

              {/* Decorative Elements */}
              <div className="absolute -top-4 left-1/4 animate-bounce delay-500">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              </div>
              <div className="absolute -top-2 right-1/3 animate-bounce delay-1000">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              </div>
            </div>

            <p className="font-comic text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in delay-300">
              Where learning becomes an exciting adventure! Join thousands of kids exploring,
              creating, and discovering amazing things every day.
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative z-[50] mb-12 animate-fade-in delay-500">
              <AnimatedSearchBar />
            </div>

            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in delay-700">
                <Link to="/courses">
                  <Button className="gradient-orange text-white font-comic font-bold px-8 py-4 text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-lg">
                    <Star className="w-5 h-5 mr-2" />
                    Start Learning Free
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="outline" className="font-comic font-bold px-8 py-4 text-lg rounded-full hover:scale-105 transition-all duration-300 border-2 border-purple-300 hover:border-purple-400">
                    <Zap className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                </Link>
              </div>


            )}

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { value: '1000+', label: 'Happy Kids', color: 'text-blue-600', icon: Users },
                { value: '50+', label: 'Fun Activities', color: 'text-green-600', icon: Sparkles },
                { value: '25+', label: 'Learning Games', color: 'text-purple-600', icon: Gamepad2 },
                { value: '100%', label: 'Safe & Fun', color: 'text-orange-600', icon: Heart }
              ].map((stat, index) => (
                <Card key={index} className={`p-4 text-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in border-2 border-gray-100 hover:border-purple-200`} style={{ animationDelay: `${0.9 + index * 0.1}s` }}>
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className={`font-fredoka font-bold text-2xl ${stat.color}`}>{stat.value}</div>
                  <div className="font-comic text-gray-600 text-sm">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Navigation Cards */}
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

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
            {/* Enhanced Courses Card */}
            <Link to="/courses">
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 group cursor-pointer relative overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 right-6 w-6 h-6 bg-indigo-400 rounded-full animate-pulse delay-1000"></div>
                  <div className="absolute top-16 right-8 w-4 h-4 bg-blue-300 rounded-full animate-pulse delay-500"></div>
                </div>

                <div className="text-center relative z-10">
                  <div className="w-20 h-20 gradient-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
                    📚 Learning Courses
                  </h3>

                  <p className="font-comic text-gray-600 mb-6 text-lg">
                    Structured lessons in Math, English, Science,
                    Art and more! Track your progress and earn rewards.
                  </p>

                  <Button className="gradient-blue text-white font-comic font-bold px-6 py-2 rounded-full group-hover:scale-105 transition-all duration-300 shadow-lg">
                    Explore Courses <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </Link>

            {/* Enhanced Activities Card */}
            <Link to="/activities">
              <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 group cursor-pointer relative overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-6 right-4 w-8 h-8 bg-purple-400 rounded-full animate-pulse delay-700"></div>
                  <div className="absolute bottom-4 left-6 w-6 h-6 bg-pink-400 rounded-full animate-pulse delay-300"></div>
                  <div className="absolute top-20 left-8 w-4 h-4 bg-purple-300 rounded-full animate-pulse delay-1200"></div>
                </div>

                <div className="text-center relative z-10">
                  <div className="w-20 h-20 gradient-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
                    🎨 Fun Activities
                  </h3>

                  <p className="font-comic text-gray-600 mb-6 text-lg">
                    Interactive stories, creative projects, painting,
                    music and fun educational activities!
                  </p>

                  <Button className="gradient-purple text-white font-comic font-bold px-6 py-2 rounded-full group-hover:scale-105 transition-all duration-300 shadow-lg">
                    Try Activities <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </Link>
          </div>

          {/* Enhanced Games Card */}
          <div className="max-w-5xl mx-auto">
            <Link to="/games">
              <Card className="p-8 bg-gradient-to-br from-green-50 to-teal-100 rounded-3xl shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 group cursor-pointer relative overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 left-1/4 w-10 h-10 bg-green-400 rounded-full animate-pulse delay-400"></div>
                  <div className="absolute bottom-8 right-1/4 w-8 h-8 bg-teal-400 rounded-full animate-pulse delay-800"></div>
                  <div className="absolute top-1/2 right-8 w-6 h-6 bg-green-300 rounded-full animate-pulse delay-1100"></div>
                </div>

                <div className="text-center relative z-10">
                  <div className="w-20 h-20 gradient-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Gamepad2 className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
                    🎮 Educational Games
                  </h3>

                  <p className="font-comic text-gray-600 mb-6 text-lg">
                    Have fun while learning with our collection of educational games!
                    Challenge yourself with math puzzles, language games, memory challenges and more.
                  </p>

                  <Button className="gradient-green text-white font-comic font-bold px-6 py-2 rounded-full group-hover:scale-105 transition-all duration-300 shadow-lg">
                    Play Games <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Quick Access Navigation */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-gray-800 mb-4">
              🎯 Quick Access Hub
            </h2>
            <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
              Jump straight into your favorite learning areas!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {[
              { name: 'Math', icon: '🔢', color: 'from-blue-400 to-blue-600', link: '/activities?tab=math' },
              { name: 'Art', icon: '🎨', color: 'from-pink-400 to-pink-600', link: '/activities?tab=art' },
              { name: 'Science', icon: '🧪', color: 'from-purple-400 to-purple-600', link: '/activities?tab=science' },
              { name: 'Music', icon: '🎵', color: 'from-yellow-400 to-yellow-600', link: '/activities?tab=music' },
              { name: 'Stories', icon: '📚', color: 'from-orange-400 to-orange-600', link: '/activities?tab=stories' },
              { name: 'Games', icon: '🎮', color: 'from-green-400 to-green-600', link: '/games' }
            ].map((item, index) => (
              <Link key={item.name} to={item.link}>
                <Card className={`p-6 text-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer animate-fade-in group border-2 border-gray-100 hover:border-orange-200`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="font-fredoka font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-gray-800 mb-4">
              Why KidLearn is Special 💫
            </h2>
            <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
              Designed with kids in mind, our platform makes learning a joyful experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Trophy, title: 'Rewards System', desc: 'Earn stars and unlock achievements as you learn and play', color: 'text-yellow-500', bg: 'bg-yellow-50' },
              { icon: Sparkles, title: 'Interactive Content', desc: 'Engaging animations, games, and stories that make learning fun', color: 'text-purple-500', bg: 'bg-purple-50' },
              { icon: Star, title: 'Progress Tracking', desc: 'See how you\'re improving with detailed progress reports', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: Users, title: 'Parent Dashboard', desc: 'Parents can monitor activity and customize learning experience', color: 'text-green-500', bg: 'bg-green-50' }
            ].map((feature, index) => (
              <Card key={index} className={`p-6 ${feature.bg} rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in border-2 border-opacity-20`} style={{ animationDelay: `${index * 0.1}s` }}>
                <feature.icon className={`w-12 h-12 ${feature.color} mx-auto mb-4`} />
                <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">{feature.title}</h3>
                <p className="font-comic text-sm text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 md:p-12 shadow-2xl mx-auto max-w-5xl relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-8 left-8 w-12 h-12 bg-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 right-8 w-8 h-8 bg-yellow-300 rounded-full animate-bounce"></div>
              <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-pink-300 rounded-full animate-pulse delay-500"></div>
              <div className="absolute bottom-1/3 right-1/3 w-10 h-10 bg-white rounded-full animate-bounce delay-1000"></div>
            </div>

            <div className="text-center relative z-10">
              <div className="flex justify-center mb-6">
                <div className="flex space-x-2">
                  <Star className="w-8 h-8 text-yellow-300 animate-spin" />
                  <Gift className="w-8 h-8 text-pink-300 animate-bounce" />
                  <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                </div>
              </div>

              <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-white mb-4">
                Ready to Start an Amazing Learning Adventure?
              </h2>
              <p className="font-comic text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join thousands of kids discovering the joy of learning every day!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-indigo-600 hover:bg-indigo-50 font-comic font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg">
                  <Star className="w-5 h-5 mr-2" />
                  Get Started Free
                </Button>
                {user && (
                  <Link to="/courses">
                    <Button className="gradient-orange text-white font-comic font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg">
                      <ArrowRight className="w-5 h-5 mr-2" />
                      Continue Learning
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </Card>
        </div>
      </section>

    </div >
  );
};

export default Index;
