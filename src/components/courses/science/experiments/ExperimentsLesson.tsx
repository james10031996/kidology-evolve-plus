
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Beaker, Timer, Star, BookOpen, Video } from 'lucide-react';

const ExperimentsLesson = () => {
  const experiments = [
    { 
      name: 'Rainbow in a Glass', 
      materials: ['Water', 'Food coloring', 'Sugar', 'Spoon'], 
      result: 'Layered rainbow colors that look magical!', 
      emoji: '🌈',
      time: '10 min',
      difficulty: 'Easy',
      safety: 'Adult supervision recommended'
    },
    { 
      name: 'Dancing Raisins', 
      materials: ['Clear soda', 'Raisins', 'Tall glass'], 
      result: 'Raisins float and sink like they\'re dancing!', 
      emoji: '🫧',
      time: '5 min',
      difficulty: 'Easy',
      safety: 'Safe for kids'
    },
    { 
      name: 'Magic Milk Colors', 
      materials: ['Milk', 'Food coloring', 'Liquid soap', 'Cotton swabs'], 
      result: 'Colors swirl and dance in beautiful patterns!', 
      emoji: '🥛',
      time: '8 min',
      difficulty: 'Easy',
      safety: 'Safe for kids'
    },
    { 
      name: 'Volcano Eruption', 
      materials: ['Baking soda', 'Vinegar', 'Red food coloring', 'Small bottle'], 
      result: 'Spectacular foamy eruption like a real volcano!', 
      emoji: '🌋',
      time: '15 min',
      difficulty: 'Medium',
      safety: 'Adult supervision required'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-fredoka text-3xl text-purple-700 mb-4">🧪 Amazing Science Experiments</h2>
        <p className="font-comic text-gray-600">Safe and fun experiments you can do at home!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {experiments.map((exp, index) => (
          <Card key={exp.name} className="p-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in border-2 border-purple-200" style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 animate-bounce">
                {exp.emoji}
              </div>
              <h3 className="font-fredoka text-2xl font-bold text-purple-700 mb-2">
                {exp.name}
              </h3>
              <div className="flex justify-center space-x-2 mb-4">
                <Badge className={`font-comic ${
                  exp.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {exp.difficulty}
                </Badge>
                <Badge variant="outline" className="font-comic">
                  <Timer className="w-3 h-3 mr-1" />
                  {exp.time}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl">
                <h4 className="font-comic font-bold text-gray-800 mb-2 flex items-center">
                  <Beaker className="w-4 h-4 mr-2" />
                  Materials needed:
                </h4>
                <ul className="font-comic text-gray-600 space-y-1">
                  {exp.materials.map((material, i) => (
                    <li key={i}>• {material}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-100 p-4 rounded-xl">
                <h4 className="font-comic font-bold text-gray-800 mb-2 flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  What happens:
                </h4>
                <p className="font-comic text-gray-700">{exp.result}</p>
              </div>

              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <h4 className="font-comic font-bold text-red-700 mb-2">⚠️ Safety Note:</h4>
                <p className="font-comic text-red-600 text-sm">{exp.safety}</p>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1 gradient-purple text-white font-comic">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Instructions
                </Button>
                <Button variant="outline" className="flex-1 font-comic border-purple-300">
                  <Video className="w-4 h-4 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExperimentsLesson;
