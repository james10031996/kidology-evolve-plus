
import { Card } from '@/components/ui/card';
import { Target, Zap, Brain, Trophy } from 'lucide-react';

const GameCategories = () => (
  <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl text-center">
      <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
      <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">Math Games</h3>
      <p className="font-comic text-sm text-gray-600">Practice numbers, counting, and basic arithmetic</p>
    </Card>

    <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl text-center">
      <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
      <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">Language</h3>
      <p className="font-comic text-sm text-gray-600">Learn letters, words, and reading skills</p>
    </Card>

    <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl text-center">
      <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
      <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">Memory</h3>
      <p className="font-comic text-sm text-gray-600">Train your brain and improve concentration</p>
    </Card>

    <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl text-center">
      <Trophy className="w-12 h-12 text-pink-600 mx-auto mb-4" />
      <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">Logic</h3>
      <p className="font-comic text-sm text-gray-600">Develop problem-solving and reasoning skills</p>
    </Card>
  </div>
);

export default GameCategories;
