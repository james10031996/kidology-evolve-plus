
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';

interface Activity {
  title: string;
  description: string;
  icon: React.ReactNode | string;
  difficulty: string;
  route?: string;
  action?: () => void;
}

interface ActivitySectionProps {
  activities: Activity[];
  gradientClass: string;
}

const ActivitySection = ({ activities, gradientClass }: ActivitySectionProps) => {
  const renderActivityCard = (activity: Activity, index: number) => (
    <Card key={index} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-2xl">
          {typeof activity.icon === 'string' ? activity.icon : activity.icon}
        </div>
        <Badge className="bg-green-100 text-green-700 font-comic">
          {activity.difficulty}
        </Badge>
      </div>
      
      <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
        {activity.title}
      </h3>
      <p className="font-comic text-gray-600 text-sm mb-4">
        {activity.description}
      </p>
      
      <Button 
        className={`w-full ${gradientClass} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
        onClick={() => {
          if (activity.action) {
            activity.action();
          } else {
            alert('Coming soon! 🎉');
          }
        }}
      >
        <Play className="w-4 h-4 mr-2" />
        Start Creating
      </Button>
    </Card>
  );

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map((activity, index) => renderActivityCard(activity, index))}
    </div>
  );
};

export default ActivitySection;
