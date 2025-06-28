
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Volume2, Mic, BookOpen, Globe2, Star, Check } from 'lucide-react';

const LanguageLab = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [completedWords, setCompletedWords] = useState([]);

  const vocabularyWords = [
    { word: 'Hello', pronunciation: 'HEH-loh', meaning: 'A greeting', language: 'English', emoji: '👋' },
    { word: 'Hola', pronunciation: 'OH-lah', meaning: 'A greeting', language: 'Spanish', emoji: '👋' },
    { word: 'Bonjour', pronunciation: 'bon-ZHOOR', meaning: 'A greeting', language: 'French', emoji: '👋' },
    { word: 'Cat', pronunciation: 'KAT', meaning: 'A furry pet animal', language: 'English', emoji: '🐱' }
  ];

  const languageActivities = [
    {
      id: 1,
      title: 'Vocabulary Builder',
      description: 'Learn new words with pictures and sounds',
      icon: '📝',
      type: 'vocabulary',
      wordsLearned: 45,
      totalWords: 100
    },
    {
      id: 2,
      title: 'Pronunciation Practice',
      description: 'Practice saying words correctly',
      icon: '🗣️',
      type: 'speaking',
      accuracy: 85
    },
    {
      id: 3,
      title: 'Story Reading',
      description: 'Read along with interactive stories',
      icon: '📚',
      type: 'reading',
      storiesRead: 12,
      totalStories: 30
    },
    {
      id: 4,
      title: 'Word Games',
      description: 'Fun games to practice spelling and meaning',
      icon: '🎯',
      type: 'games',
      gamesPlayed: 8,
      bestScore: 950
    }
  ];

  const markWordComplete = (index) => {
    if (!completedWords.includes(index)) {
      setCompletedWords([...completedWords, index]);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => setIsRecording(false), 2000); // Simulate recording
    }
  };

  return (
    <div className="space-y-6">
      {/* Language Practice Card */}
      <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center mb-6">
          <div className="w-16 h-16 gradient-green rounded-full mx-auto mb-3 flex items-center justify-center">
            <Globe2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            🌍 Language Learning Lab
          </h2>
        </div>

        {/* Current Word Practice */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-6xl mb-3">{vocabularyWords[currentWord]?.emoji}</div>
            <h3 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
              {vocabularyWords[currentWord]?.word}
            </h3>
            <p className="font-comic text-gray-600 mb-1">
              /{vocabularyWords[currentWord]?.pronunciation}/
            </p>
            <p className="font-comic text-sm text-gray-500">
              {vocabularyWords[currentWord]?.meaning}
            </p>
          </div>

          <div className="flex justify-center space-x-4 mb-4">
            <Button 
              size="sm"
              className="gradient-blue text-white font-comic rounded-full"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Listen
            </Button>
            <Button 
              size="sm"
              onClick={toggleRecording}
              className={`font-comic rounded-full ${
                isRecording ? 'bg-red-500 text-white' : 'gradient-green text-white'
              }`}
            >
              <Mic className="w-4 h-4 mr-2" />
              {isRecording ? 'Recording...' : 'Practice'}
            </Button>
            <Button 
              size="sm"
              onClick={() => markWordComplete(currentWord)}
              disabled={completedWords.includes(currentWord)}
              className="gradient-orange text-white font-comic rounded-full"
            >
              <Check className="w-4 h-4 mr-2" />
              Got it!
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <Button 
              size="sm"
              variant="outline"
              onClick={() => setCurrentWord(Math.max(0, currentWord - 1))}
              disabled={currentWord === 0}
              className="font-comic rounded-full"
            >
              Previous
            </Button>
            <span className="font-comic text-sm text-gray-600">
              {currentWord + 1} of {vocabularyWords.length}
            </span>
            <Button 
              size="sm"
              variant="outline"
              onClick={() => setCurrentWord(Math.min(vocabularyWords.length - 1, currentWord + 1))}
              disabled={currentWord === vocabularyWords.length - 1}
              className="font-comic rounded-full"
            >
              Next
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-comic font-bold text-gray-800">Learning Progress</span>
            <span className="font-comic text-sm text-gray-600">
              {completedWords.length}/{vocabularyWords.length} words
            </span>
          </div>
          <Progress value={(completedWords.length / vocabularyWords.length) * 100} className="h-3" />
        </div>
      </Card>

      {/* Language Activities */}
      <div className="grid md:grid-cols-2 gap-6">
        {languageActivities.map((activity) => (
          <Card key={activity.id} className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
            <div className="text-center mb-3">
              <div className="text-3xl mb-2">{activity.icon}</div>
              <h3 className="font-fredoka font-bold text-lg text-gray-800">{activity.title}</h3>
            </div>

            <p className="font-comic text-sm text-gray-600 mb-4 text-center">
              {activity.description}
            </p>

            {/* Activity-specific stats */}
            <div className="space-y-3 mb-4">
              {activity.type === 'vocabulary' && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-comic">Words Learned</span>
                    <span className="font-comic font-bold">{activity.wordsLearned}/{activity.totalWords}</span>
                  </div>
                  <Progress value={(activity.wordsLearned / activity.totalWords) * 100} className="h-2" />
                </div>
              )}

              {activity.type === 'speaking' && (
                <div className="text-center">
                  <div className="font-comic text-sm text-gray-600">Pronunciation Accuracy</div>
                  <div className="font-fredoka text-2xl text-green-500">{activity.accuracy}%</div>
                </div>
              )}

              {activity.type === 'reading' && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-comic">Stories Read</span>
                    <span className="font-comic font-bold">{activity.storiesRead}/{activity.totalStories}</span>
                  </div>
                  <Progress value={(activity.storiesRead / activity.totalStories) * 100} className="h-2" />
                </div>
              )}

              {activity.type === 'games' && (
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="font-comic text-gray-600">Games Played</div>
                    <div className="font-fredoka text-lg">{activity.gamesPlayed}</div>
                  </div>
                  <div>
                    <div className="font-comic text-gray-600">Best Score</div>
                    <div className="font-fredoka text-lg text-yellow-500">{activity.bestScore}</div>
                  </div>
                </div>
              )}
            </div>

            <Button className="w-full gradient-green text-white font-comic font-bold rounded-full">
              Continue Learning
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LanguageLab;
