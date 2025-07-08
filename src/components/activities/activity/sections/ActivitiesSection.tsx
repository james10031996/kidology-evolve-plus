
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Activity {
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: string;
  gradient: string;
  action: () => void;
}

interface ActivitiesSectionProps {
  activities: Activity[];
  title: string;
  subtitle: string;
  gradientClass: string;
}

const ActivitiesSection = ({ activities, title, subtitle, gradientClass }: ActivitiesSectionProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-fredoka text-3xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="font-comic text-gray-600 text-lg">{subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity, index) => (
          <Card 
            key={activity.title} 
            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in border-2 border-transparent hover:border-purple-200" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`${activity.gradient} rounded-xl p-6 mb-4 text-white text-center`}>
              <div className="text-4xl mb-2 animate-bounce">
                {activity.icon}
              </div>
              <h3 className="font-fredoka font-bold text-lg">{activity.title}</h3>
            </div>

            <p className="font-comic text-gray-600 text-sm mb-4">{activity.description}</p>

            <div className="flex items-center justify-between mb-4">
              <Badge className={`font-comic text-xs ${
                activity.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {activity.difficulty}
              </Badge>
            </div>

            <Button 
              className={`w-full ${activity.gradient} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
              onClick={activity.action}
            >
              Start Activity! 🚀
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesSection;
