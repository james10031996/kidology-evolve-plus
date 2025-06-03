
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Palette, CheckCircle, Star, Volume2, ArrowRight } from 'lucide-react';

type Story = {
  id: string;
  title: string;
  text: string;
  illustrations: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  theme: string;
  color: string;
};

const StoryIllustrationStudio = () => {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [userDrawings, setUserDrawings] = useState<{ [key: string]: string }>({});
  const [completedStories, setCompletedStories] = useState(new Set<string>());
  const [score, setScore] = useState(0);

  const stories: Story[] = [
    {
      id: '1',
      title: 'The Little Red Hen',
      text: 'Once upon a time, there was a little red hen who found some wheat seeds.',
      illustrations: ['🐓', '🌾', '🍞', '🏠'],
      difficulty: 'Easy',
      theme: 'Farm',
      color: 'bg-red-50'
    },
    {
      id: '2',
      title: 'The Three Little Bears',
      text: 'Goldilocks entered the bears\' house and found three bowls of porridge.',
      illustrations: ['👧', '🐻', '🥣', '🏡'],
      difficulty: 'Easy',
      theme: 'Fantasy',
      color: 'bg-brown-50'
    },
    {
      id: '3',
      title: 'The Magic Garden',
      text: 'In a secret garden, flowers could talk and butterflies painted rainbows.',
      illustrations: ['🌺', '🦋', '🌈', '✨'],
      difficulty: 'Medium',
      theme: 'Magic',
      color: 'bg-green-50'
    },
    {
      id: '4',
      title: 'Space Adventure',
      text: 'Captain Luna flew her rocket to the moon and met friendly aliens.',
      illustrations: ['👩‍🚀', '🚀', '🌙', '👽'],
      difficulty: 'Medium',
      theme: 'Space',
      color: 'bg-blue-50'
    },
    {
      id: '5',
      title: 'The Underwater Kingdom',
      text: 'Deep in the ocean, a mermaid princess lived in a coral castle.',
      illustrations: ['🧜‍♀️', '🏰', '🐠', '🌊'],
      difficulty: 'Hard',
      theme: 'Ocean',
      color: 'bg-cyan-50'
    },
    {
      id: '6',
      title: 'The Magical Forest',
      text: 'A brave knight met a wise owl who showed him the way to the treasure.',
      illustrations: ['🤴', '🦉', '🏺', '🌲'],
      difficulty: 'Hard',
      theme: 'Adventure',
      color: 'bg-green-50'
    }
  ];

  const playStoryAudio = (text: string) => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startStory = (story: Story) => {
    setCurrentStory(story);
    setCurrentScene(0);
  };

  const nextScene = () => {
    if (currentStory && currentScene < currentStory.illustrations.length - 1) {
      setCurrentScene(prev => prev + 1);
    } else if (currentStory) {
      // Complete story
      setCompletedStories(prev => new Set([...prev, currentStory.id]));
      setScore(prev => prev + 50);
      setCurrentStory(null);
      setCurrentScene(0);
    }
  };

  const matchIllustration = (illustration: string) => {
    if (currentStory) {
      const key = `${currentStory.id}-${currentScene}`;
      setUserDrawings(prev => ({ ...prev, [key]: illustration }));
      setScore(prev => prev + 10);
      
      setTimeout(() => {
        nextScene();
      }, 1000);
    }
  };

  const backToStories = () => {
    setCurrentStory(null);
    setCurrentScene(0);
  };

  if (!currentStory) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl border-0 shadow-lg">
          <div className="text-center">
            <div className="w-16 h-16 gradient-orange rounded-full mx-auto mb-3 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
              📖 Story Illustration Studio
            </h2>
            <p className="font-comic text-gray-600">
              Choose pictures that match the stories and create amazing illustrations!
            </p>
            <div className="mt-3 flex items-center justify-center space-x-4">
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-comic font-bold">
                <Star className="w-4 h-4 inline mr-1" />
                Score: {score}
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-comic font-bold">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Stories: {completedStories.size}
              </div>
            </div>
          </div>
        </Card>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Card
              key={story.id}
              className="p-4 cursor-pointer transition-all transform hover:scale-105 border-2 hover:border-orange-300 hover:shadow-lg"
              onClick={() => startStory(story)}
            >
              <div className={`${story.color} rounded-xl p-4 mb-3`}>
                <div className="flex justify-center space-x-2 text-2xl mb-2">
                  {story.illustrations.slice(0, 2).map((ill, idx) => (
                    <span key={idx}>{ill}</span>
                  ))}
                </div>
                <h3 className="font-fredoka font-bold text-lg text-gray-800 text-center">
                  {story.title}
                </h3>
              </div>
              
              <p className="font-comic text-sm text-gray-600 text-center mb-3 line-clamp-2">
                {story.text}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-comic font-bold ${
                  story.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  story.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {story.difficulty}
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-comic">
                  {story.theme}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-1">
                  {story.illustrations.map((ill, idx) => (
                    <div key={idx} className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs border">
                      {completedStories.has(story.id) ? '✓' : idx + 1}
                    </div>
                  ))}
                </div>
                {completedStories.has(story.id) && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>

              <Button className="w-full mt-3 rounded-full gradient-orange text-white font-comic">
                {completedStories.has(story.id) ? 'Read Again' : 'Start Story'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Story View
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl border-0 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <Button onClick={backToStories} variant="outline" className="rounded-full font-comic">
            ← Back to Stories
          </Button>
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-comic font-bold">
              <Star className="w-4 h-4 inline mr-1" />
              Score: {score}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            {currentStory.title}
          </h2>
          <p className="font-comic text-gray-600">
            Scene {currentScene + 1} of {currentStory.illustrations.length}
          </p>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Story Panel */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <div className={`${currentStory.color} rounded-2xl p-6 text-center mb-6`}>
            <div className="text-6xl mb-4">📖</div>
            <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">
              Story Scene {currentScene + 1}
            </h3>
            <div className="bg-white bg-opacity-70 rounded-xl p-4">
              <p className="font-comic text-gray-700 leading-relaxed">
                {currentStory.text}
              </p>
            </div>
            
            <Button
              onClick={() => playStoryAudio(currentStory.text)}
              className="mt-4 rounded-full gradient-blue text-white font-comic"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Read Story Aloud
            </Button>
          </div>

          {/* Progress */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-comic font-bold text-gray-800">Story Progress</span>
              <span className="font-comic text-sm text-gray-600">
                {currentScene + 1}/{currentStory.illustrations.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-orange-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentScene + 1) / currentStory.illustrations.length) * 100}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Illustration Panel */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4 text-center">
            🎨 Choose the Right Illustration
          </h3>
          
          <div className="space-y-4">
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <h4 className="font-comic font-bold text-purple-800 mb-2">
                What picture matches this scene?
              </h4>
              <p className="font-comic text-sm text-purple-600">
                Click on the illustration that fits the story best!
              </p>
            </div>

            {/* Illustration Options */}
            <div className="grid grid-cols-2 gap-4">
              {/* Correct illustration */}
              <Card
                className="p-6 cursor-pointer transition-all transform hover:scale-105 border-2 hover:border-green-400 bg-gradient-to-br from-green-50 to-blue-50"
                onClick={() => matchIllustration(currentStory.illustrations[currentScene])}
              >
                <div className="text-center">
                  <div className="text-6xl mb-2">{currentStory.illustrations[currentScene]}</div>
                  <p className="font-comic text-sm text-gray-600">Perfect Match!</p>
                </div>
              </Card>

              {/* Random other illustrations */}
              {['🌟', '🎈', '🎯', '🎪', '🎨', '🎭'].slice(0, 3).map((icon, idx) => (
                <Card
                  key={idx}
                  className="p-6 cursor-pointer transition-all transform hover:scale-105 border-2 hover:border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100"
                  onClick={() => {
                    // Wrong choice - give feedback
                    if (window.speechSynthesis) {
                      const utterance = new SpeechSynthesisUtterance("Try again! Look for the picture that matches the story.");
                      window.speechSynthesis.speak(utterance);
                    }
                  }}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-2">{icon}</div>
                    <p className="font-comic text-sm text-gray-600">Try Again</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Hint */}
            <div className="bg-yellow-50 rounded-xl p-4">
              <h4 className="font-comic font-bold text-yellow-800 mb-2">💡 Hint</h4>
              <p className="font-comic text-sm text-yellow-700">
                Read the story carefully and think about what the main character or object would be in this scene!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StoryIllustrationStudio;
