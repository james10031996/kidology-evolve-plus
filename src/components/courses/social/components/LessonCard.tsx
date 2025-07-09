
import { Card } from '@/components/ui/card';

interface Lesson {
  title: string;
  content: string;
  funFact: string;
  activity: string;
}

interface LessonCardProps {
  lesson: Lesson;
  index: number;
}

const LessonCard = ({ lesson, index }: LessonCardProps) => {
  return (
    <Card className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
      <h3 className="font-fredoka text-2xl font-bold text-pink-700 mb-4">
        {lesson.title}
      </h3>
      
      <div className="bg-pink-50 p-6 rounded-xl mb-4">
        <h4 className="font-comic font-bold text-gray-800 mb-2">💭 Let's Learn:</h4>
        <p className="font-comic text-gray-700 text-lg">{lesson.content}</p>
      </div>

      <div className="bg-yellow-100 p-6 rounded-xl mb-4">
        <h4 className="font-comic font-bold text-gray-800 mb-2">🌟 Amazing Fact:</h4>
        <p className="font-comic text-gray-700">{lesson.funFact}</p>
      </div>

      <div className="bg-green-100 p-6 rounded-xl">
        <h4 className="font-comic font-bold text-gray-800 mb-2">🎯 Your Mission:</h4>
        <p className="font-comic text-gray-700">{lesson.activity}</p>
      </div>
    </Card>
  );
};

export default LessonCard;
