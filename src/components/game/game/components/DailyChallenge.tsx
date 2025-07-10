
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

const DailyChallenge = () => (
  <div className="mt-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 text-center">
    <div className="flex items-center justify-center space-x-3 mb-4">
      <Trophy className="w-8 h-8 text-orange-500 animate-bounce" />
      <h3 className="font-fredoka font-bold text-2xl text-gray-800">
        Daily Game Challenge
      </h3>
    </div>
    <p className="font-comic text-gray-700 mb-4">
      Complete 3 different games today to earn a special bonus reward!
    </p>
    <div className="flex justify-center">
      <Badge className="gradient-orange text-white font-comic font-bold px-4 py-2">
        +150 Bonus Stars Available!
      </Badge>
    </div>
  </div>
);

export default DailyChallenge;
