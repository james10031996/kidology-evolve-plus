
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Demo = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(0);

  const demos = [
    {
      title: "📚 Interactive Learning",
      description: "Watch how children learn with engaging animations and interactive content",
      video: "https://example.com/demo1.mp4",
      features: ["Animated Stories", "Interactive Lessons", "Progress Tracking"]
    },
    {
      title: "🎮 Fun Games",
      description: "Discover educational games that make learning enjoyable",
      video: "https://example.com/demo2.mp4",
      features: ["Number Games", "Shape Sorting", "Letter Safari"]
    },
    {
      title: "🎨 Creative Activities",
      description: "Explore artistic and creative learning experiences",
      video: "https://example.com/demo3.mp4",
      features: ["Digital Art", "Story Creation", "Music & Movement"]
    }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/')} variant="ghost" className="mr-4 font-comic">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
            🎬 Watch Our Learning Platform Demo
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            See how children learn and grow with our interactive educational platform
          </p>
        </div>

        {/* Main Video Player */}
        <Card className="max-w-4xl mx-auto mb-12 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
          <div className="relative aspect-video bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4 animate-bounce">🎥</div>
              <h3 className="text-2xl font-fredoka font-bold text-gray-800 mb-4">
                {demos[currentDemo].title}
              </h3>
              <p className="text-gray-600 font-comic mb-6">
                {demos[currentDemo].description}
              </p>
              
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={handlePlayPause}
                  className="gradient-blue text-white hover:opacity-90"
                  size="lg"
                >
                  {isPlaying ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play Demo'}
                </Button>
                
                <Button
                  onClick={() => setIsPlaying(false)}
                  variant="outline"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                  size="lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Restart
                </Button>
              </div>
            </div>
          </div>
          
          {/* Video Controls */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-fredoka font-bold text-lg text-gray-800">
                Features Highlighted:
              </h4>
              <div className="text-sm font-comic text-gray-600">
                Demo {currentDemo + 1} of {demos.length}
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {demos[currentDemo].features.map((feature, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-center">
                    <div className="text-2xl mb-2">✨</div>
                    <div className="font-comic font-bold text-gray-700">{feature}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Demo Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {demos.map((demo, index) => (
            <Card
              key={index}
              className={`p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                currentDemo === index 
                  ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300 shadow-lg' 
                  : 'bg-white hover:shadow-lg'
              }`}
              onClick={() => setCurrentDemo(index)}
            >
              <div className="text-center">
                <div className="text-4xl mb-3 animate-bounce">{demo.title.split(' ')[0]}</div>
                <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                  {demo.title.substring(2)}
                </h3>
                <p className="font-comic text-sm text-gray-600">
                  {demo.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="p-8 bg-gradient-to-r from-orange-100 to-pink-100 text-center">
          <div className="text-6xl mb-4 animate-bounce">🚀</div>
          <h3 className="font-fredoka font-bold text-2xl text-gray-800 mb-4">
            Ready to Start Learning?
          </h3>
          <p className="font-comic text-gray-600 mb-6">
            Join thousands of children on their educational journey today!
          </p>
          <Button
            onClick={() => navigate('/courses')}
            className="gradient-orange text-white font-comic font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform"
            size="lg"
          >
            Start Learning Now
            <Play className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Demo;
