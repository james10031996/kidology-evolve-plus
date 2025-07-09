
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import { socialTopics } from './data/socialTopicsData';
import SocialTopicCard from './components/SocialTopicCard';
import LessonCard from './components/LessonCard';

const SocialMoral = () => {
  const navigate = useNavigate();
  const { updateStars, updateProgress } = useUser();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const startTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    updateStars(15);
    updateProgress('Social', 8);
  };

  if (selectedTopic) {
    const topic = socialTopics.find(t => t.id === selectedTopic);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button onClick={() => setSelectedTopic(null)} variant="ghost" className="mr-4 font-comic">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Topics
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
              {topic?.title}
            </h1>
            <p className="font-comic text-lg text-gray-600">
              {topic?.description}
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-8">
            {topic?.lessons.map((lesson, index) => (
              <LessonCard key={index} lesson={lesson} index={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/courses')} variant="ghost" className="mr-4 font-comic">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
            ❤️ Social & Moral Learning
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about kindness, friendship, sharing, and understanding feelings to become the best version of yourself!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {socialTopics.map((topic, index) => (
            <SocialTopicCard 
              key={topic.id} 
              topic={topic} 
              onStart={startTopic}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMoral;
