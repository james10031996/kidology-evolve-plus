
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Palette, Star, Music, Camera, Scissors } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';

const CreativeArts = () => {
  const navigate = useNavigate();
  const { updateStars, updateProgress } = useUser();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const creativeTopics = {
    drawing: {
      title: '🎨 Drawing & Painting',
      lessons: [
        { name: 'Basic Shapes', emoji: '⭕🔺🟦', description: 'Draw circles, triangles, and squares', difficulty: 'Easy' },
        { name: 'Color Mixing', emoji: '🌈', description: 'Learn how colors blend together', difficulty: 'Easy' },
        { name: 'Simple Animals', emoji: '🐱🐶', description: 'Draw cute pets step by step', difficulty: 'Medium' },
        { name: 'Landscapes', emoji: '🏔️🌅', description: 'Paint beautiful nature scenes', difficulty: 'Medium' }
      ]
    },
    music: {
      title: '🎵 Music & Rhythm',
      lessons: [
        { name: 'Musical Notes', emoji: '🎼', description: 'Learn about different sounds', difficulty: 'Easy' },
        { name: 'Rhythm Patterns', emoji: '🥁', description: 'Clap and tap to the beat', difficulty: 'Easy' },
        { name: 'Simple Songs', emoji: '🎤', description: 'Sing along to fun melodies', difficulty: 'Medium' },
        { name: 'Instrument Sounds', emoji: '🎸🎹', description: 'Identify different instruments', difficulty: 'Medium' }
      ]
    },
    crafts: {
      title: '✂️ Arts & Crafts',
      lessons: [
        { name: 'Paper Folding', emoji: '📄', description: 'Simple origami for beginners', difficulty: 'Easy' },
        { name: 'Collage Making', emoji: '🖼️', description: 'Cut and paste colorful art', difficulty: 'Easy' },
        { name: 'Clay Modeling', emoji: '🏺', description: 'Shape and mold with clay', difficulty: 'Medium' },
        { name: 'Friendship Bracelets', emoji: '💝', description: 'Weave colorful patterns', difficulty: 'Hard' }
      ]
    },
    photography: {
      title: '📸 Photography Basics',
      lessons: [
        { name: 'Light & Shadows', emoji: '💡🌙', description: 'Understanding light in photos', difficulty: 'Easy' },
        { name: 'Composition', emoji: '🖼️', description: 'Making pictures look nice', difficulty: 'Medium' },
        { name: 'Nature Photos', emoji: '🌸🦋', description: 'Capturing outdoor beauty', difficulty: 'Medium' },
        { name: 'Portrait Fun', emoji: '😊📷', description: 'Taking pictures of friends', difficulty: 'Hard' }
      ]
    },
    dance: {
      title: '💃 Movement & Dance',
      lessons: [
        { name: 'Basic Movements', emoji: '🤸‍♀️', description: 'Simple dance steps', difficulty: 'Easy' },
        { name: 'Animal Dances', emoji: '🐸🦆', description: 'Move like different animals', difficulty: 'Easy' },
        { name: 'Cultural Dances', emoji: '🌍', description: 'Dances from around world', difficulty: 'Medium' },
        { name: 'Creative Expression', emoji: '✨', description: 'Make up your own moves', difficulty: 'Medium' }
      ]
    },
    theater: {
      title: '🎭 Drama & Theater',
      lessons: [
        { name: 'Emotions Acting', emoji: '😄😢😲', description: 'Show feelings with face', difficulty: 'Easy' },
        { name: 'Voice Changes', emoji: '🗣️', description: 'Different character voices', difficulty: 'Easy' },
        { name: 'Puppet Shows', emoji: '🎪', description: 'Create puppet characters', difficulty: 'Medium' },
        { name: 'Story Acting', emoji: '📚🎬', description: 'Act out favorite stories', difficulty: 'Hard' }
      ]
    }
  };

  const lessons = [
    { id: 'drawing', title: '🎨 Drawing & Painting', description: 'Express yourself with colors and shapes', color: 'gradient-pink', difficulty: 'Easy' },
    { id: 'music', title: '🎵 Music & Rhythm', description: 'Make beautiful sounds and melodies', color: 'gradient-purple', difficulty: 'Easy' },
    { id: 'crafts', title: '✂️ Arts & Crafts', description: 'Create amazing projects with your hands', color: 'gradient-orange', difficulty: 'Medium' },
    { id: 'photography', title: '📸 Photography Basics', description: 'Capture the world through pictures', color: 'gradient-blue', difficulty: 'Medium' },
    { id: 'dance', title: '💃 Movement & Dance', description: 'Move your body to express feelings', color: 'gradient-green', difficulty: 'Easy' },
    { id: 'theater', title: '🎭 Drama & Theater', description: 'Act out stories and characters', color: 'bg-gradient-to-r from-purple-300 via-pink-300 to-red-300', difficulty: 'Medium' }
  ];

  const startLesson = (lessonId: string) => {
    setSelectedLesson(lessonId);
    updateStars(12);
    updateProgress('Creative Arts', 8);
  };

  const renderTopicLessons = (topicId: string) => {
    const topic = creativeTopics[topicId as keyof typeof creativeTopics];
    if (!topic) return null;

    return (
      <div className="grid md:grid-cols-2 gap-8">
        {topic.lessons.map((lesson, index) => (
          <Card key={index} className="p-8 bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 animate-bounce">{lesson.emoji}</div>
              <h3 className="font-fredoka text-2xl font-bold text-gray-800 mb-2">{lesson.name}</h3>
              <p className="font-comic text-gray-600">{lesson.description}</p>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <Badge className={`font-comic ${
                lesson.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                lesson.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {lesson.difficulty}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="font-comic font-bold text-blue-800 mb-2">🎯 What You'll Learn:</h4>
                <p className="font-comic text-blue-700 text-sm">{lesson.description}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl">
                <h4 className="font-comic font-bold text-green-800 mb-2">🌟 Fun Activities:</h4>
                <ul className="font-comic text-green-700 text-sm space-y-1">
                  <li>• Hands-on creative projects</li>
                  <li>• Step-by-step tutorials</li>
                  <li>• Share your creations</li>
                </ul>
              </div>
            </div>

            <Button className="w-full mt-6 gradient-purple text-white font-comic font-bold rounded-full hover:scale-105 transition-transform">
              <Play className="w-4 h-4 mr-2" />
              Start Creating
            </Button>
          </Card>
        ))}
      </div>
    );
  };

  if (selectedLesson) {
    const lesson = lessons.find(l => l.id === selectedLesson);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button onClick={() => setSelectedLesson(null)} variant="ghost" className="mr-4 font-comic">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Topics
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
              {lesson?.title}
            </h1>
            <p className="font-comic text-lg text-gray-600">
              {lesson?.description}
            </p>
          </div>

          {renderTopicLessons(selectedLesson)}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/activities')} variant="ghost" className="mr-4 font-comic">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Activities
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
            🎨 Creative Arts Academy
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Unleash your creativity! Explore drawing, music, crafts, photography, dance, and theater. Express yourself through art and have fun creating amazing projects!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <Card key={lesson.id} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`w-full h-32 ${lesson.color} rounded-xl mb-4 flex items-center justify-center`}>
                <div className="text-4xl text-white animate-bounce">
                  {lesson.title.split(' ')[0]}
                </div>
              </div>

              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">
                {lesson.title}
              </h3>
              <p className="font-comic text-gray-600 text-sm mb-4">
                {lesson.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <Badge className={`font-comic ${
                  lesson.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  lesson.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {lesson.difficulty}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-comic text-sm font-bold text-yellow-600">12 stars</span>
                </div>
              </div>

              <Button 
                className={`w-full ${lesson.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
                onClick={() => startLesson(lesson.id)}
              >
                <Palette className="w-4 h-4 mr-2" />
                Start Creating
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreativeArts;
