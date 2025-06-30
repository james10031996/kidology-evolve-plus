
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: number;
  title: string;
  description: string;
  icon: string;
  type: string;
  difficulty: string;
  duration: string;
  completed: boolean;
}

interface ActivityCardProps {
  activity: Activity;
  gradientClass?: string;
}

const ActivityCard = ({ activity, gradientClass = 'gradient-pink' }: ActivityCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
      <div className="text-center mb-3">
        <div className="text-3xl mb-2">{activity.icon}</div>
        <h4 className="font-fredoka font-bold text-lg text-gray-800">{activity.title}</h4>
      </div>

      <p className="font-comic text-sm text-gray-600 mb-4 text-center">
        {activity.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <Badge className={`font-comic text-xs ${getDifficultyColor(activity.difficulty)}`}>
          {activity.difficulty}
        </Badge>
        <Badge variant="outline" className="font-comic text-xs">
          {activity.duration}
        </Badge>
      </div>

      <Button className={`w-full font-comic font-bold rounded-full ${
        activity.completed ? 'bg-gray-200 text-gray-600' : `${gradientClass} text-white`
      }`}>
        {activity.completed ? 'Play Again' : 'Start Activity'}
      </Button>
    </Card>
  );
};

export default ActivityCard;
