
import React from 'react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, Star, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import GameCompletionPopup from '@/components/game/game/GameCompletionPopup';
import InteractiveQuiz from '../quiz/InteractiveQuiz';

const EnglishAdventure = () => {
  const navigate = useNavigate();
  const { updateStars, updateProgress } = useUser();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [completionData, setCompletionData] = useState({ score: 0, stars: 0, gameName: '' });

  const lessons = [
    { id: 'alphabet', title: '🔤 Alphabet Adventure', description: 'Learn all 26 letters with fun activities', color: 'gradient-blue', difficulty: 'Easy', duration: '15 min' },
    { id: 'phonics', title: '🗣️ Phonics Fun', description: 'Connect letters to sounds', color: 'gradient-green', difficulty: 'Easy', duration: '20 min' },
    { id: 'sight-words', title: '👁️ Sight Words', description: 'Recognize common words instantly', color: 'bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600', difficulty: 'Medium', duration: '25 min' },
    { id: 'rhyming', title: '🎵 Rhyming Games', description: 'Discover words that sound alike', color: 'gradient-purple', difficulty: 'Easy', duration: '18 min' },
    { id: 'spelling', title: '✏️ Spelling Bee', description: 'Build words letter by letter', color: 'gradient-orange', difficulty: 'Medium', duration: '22 min' },
    { id: 'reading', title: '📚 Reading Stories', description: 'Practice reading simple stories', color: 'gradient-pink', difficulty: 'Medium', duration: '30 min' }
  ];

  const alphabetLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
    letter,
    word: {
      A: 'Apple', B: 'Ball', C: 'Cat', D: 'Dog', E: 'Egg', F: 'Fish',
      G: 'Goat', H: 'Hat', I: 'Ice', J: 'Jam', K: 'Kite', L: 'Lion',
      M: 'Moon', N: 'Net', O: 'Owl', P: 'Pig', Q: 'Queen', R: 'Rain',
      S: 'Sun', T: 'Tree', U: 'Umbrella', V: 'Van', W: 'Water', X: 'X-ray',
      Y: 'Yellow', Z: 'Zebra'
    }[letter],
    emoji: {
      A: '🍎', B: '⚽', C: '🐱', D: '🐕', E: '🥚', F: '🐟',
      G: '🐐', H: '👒', I: '🧊', J: '🍯', K: '🪁', L: '🦁',
      M: '🌙', N: '🥅', O: '🦉', P: '🐷', Q: '👑', R: '🌧️',
      S: '☀️', T: '🌳', U: '☂️', V: '🚐', W: '💧', X: '🩻',
      Y: '💛', Z: '🦓'
    }[letter]
  }));

  const quizQuestions = {
    alphabet: [
      {
        id: '1',
        question: 'What letter comes after M?',
        options: ['L', 'N', 'O', 'P'],
        correctAnswer: 1,
        explanation: 'In the alphabet order, N comes right after M! M-N-O-P...',
        concept: 'Alphabetical order and letter sequence',
        emoji: '🔤',
        animation: 'bounce'
      },
      {
        id: '2',
        question: 'Which word starts with the letter B?',
        options: ['Apple', 'Ball', 'Cat', 'Dog'],
        correctAnswer: 1,
        explanation: 'Ball starts with the letter B! B-A-L-L',
        concept: 'Letter-sound correspondence and word recognition',
        emoji: '⚽',
        animation: 'pulse'
      }
    ],
    phonics: [
      {
        id: '1',
        question: 'What sound does the letter "S" make?',
        options: ['Mmm', 'Sss', 'Rrr', 'Ttt'],
        correctAnswer: 1,
        explanation: 'The letter S makes a "Sss" sound, like a snake!',
        concept: 'Letter-sound relationships in phonics',
        emoji: '🐍',
        animation: 'bounce'
      }
    ]
  };

  const renderAlphabetLesson = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {alphabetLetters.map((item, index) => (
          <Card key={item.letter} className="p-4 text-center bg-white hover:shadow-lg transition-all duration-300 animate-fade-in border-2 border-blue-100" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="text-4xl font-fredoka font-bold text-blue-600 mb-2 animate-bounce">
              {item.letter}
            </div>
            <div className="text-3xl mb-2">
              {item.emoji}
            </div>
            <div className="font-comic text-sm text-gray-700 font-bold">
              {item.word}
            </div>
          </Card>
        ))}
      </div>
      <div className="text-center">
        <Button onClick={() => completeLesson('alphabet')} className="gradient-blue text-white font-comic font-bold px-8 py-3 rounded-full text-lg">
          <Trophy className="w-5 h-5 mr-2" />
          Complete Alphabet Lesson
        </Button>
      </div>
    </div>
  );

  const renderPhonicsLesson = () => {
    const phonicsWords = [
      { word: 'CAT', sounds: ['C-A-T'], emoji: '🐱', color: 'bg-red-100' },
      { word: 'DOG', sounds: ['D-O-G'], emoji: '🐕', color: 'bg-blue-100' },
      { word: 'SUN', sounds: ['S-U-N'], emoji: '☀️', color: 'bg-yellow-100' },
      { word: 'BEE', sounds: ['B-E-E'], emoji: '🐝', color: 'bg-green-100' }
    ];

    return (
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phonicsWords.map((item, index) => (
            <Card key={item.word} className={`p-6 text-center ${item.color} hover:shadow-lg transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="text-6xl mb-4 animate-bounce">
                {item.emoji}
              </div>
              <div className="font-fredoka text-2xl font-bold text-gray-800 mb-2">
                {item.word}
              </div>
              <div className="font-comic text-lg text-gray-600">
                {item.sounds[0]}
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Button onClick={() => completeLesson('phonics')} className="gradient-green text-white font-comic font-bold px-8 py-3 rounded-full text-lg">
            <Trophy className="w-5 h-5 mr-2" />
            Complete Phonics Lesson
          </Button>
        </div>
      </div>
    );
  };

  const completeLesson = (lessonId: string) => {
    if (!completedTopics.includes(lessonId)) {
      setCompletedTopics([...completedTopics, lessonId]);
      const lesson = lessons.find(l => l.id === lessonId);
      
      if (quizQuestions[lessonId as keyof typeof quizQuestions]) {
        setCurrentQuiz({
          questions: quizQuestions[lessonId as keyof typeof quizQuestions],
          title: lesson?.title || 'English Quiz',
          subject: 'English',
          lessonId
        });
        setShowQuiz(true);
      } else {
        const stars = lesson?.difficulty === 'Easy' ? 10 : 15;
        updateStars(stars);
        updateProgress('English', 15);
        setCompletionData({
          score: stars * 10,
          stars: stars,
          gameName: lesson?.title || 'English Topic'
        });
        setShowCompletion(true);
      }
    }
  };

  const handleQuizComplete = (score: number, stars: number) => {
    const lesson = lessons.find(l => l.id === currentQuiz.lessonId);
    const baseStars = lesson?.difficulty === 'Easy' ? 10 : 15;
    const totalStars = baseStars + (stars * 5);
    
    updateStars(totalStars);
    updateProgress('English', 15);
    setCompletionData({
      score: score * 100,
      stars: totalStars,
      gameName: lesson?.title || 'English Topic'
    });
    setShowQuiz(false);
    setCurrentQuiz(null);
    setShowCompletion(true);
  };

  if (selectedLesson) {
    const lesson = lessons.find(l => l.id === selectedLesson);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button onClick={() => setSelectedLesson(null)} variant="ghost" className="mr-4 font-comic">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </Button>
            {completedTopics.includes(selectedLesson) && (
              <Badge className="bg-green-100 text-green-700 font-comic">
                <Trophy className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>

          <div className="text-center mb-8">
            <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
              {lesson?.title}
            </h1>
            <p className="font-comic text-lg text-gray-600">
              {lesson?.description}
            </p>
          </div>

          {selectedLesson === 'alphabet' && renderAlphabetLesson()}
          {selectedLesson === 'phonics' && renderPhonicsLesson()}
        </div>

        <GameCompletionPopup
          isOpen={showCompletion}
          onClose={() => setShowCompletion(false)}
          score={completionData.score}
          stars={completionData.stars}
          gameName={completionData.gameName}
        />

        {showQuiz && currentQuiz && (
          <InteractiveQuiz
            questions={currentQuiz.questions}
            title={currentQuiz.title}
            subject={currentQuiz.subject}
            onClose={() => {
              setShowQuiz(false);
              setCurrentQuiz(null);
            }}
            onComplete={handleQuizComplete}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
            📚 English Adventure
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the wonderful world of English! Learn letters, sounds, words, and stories with fun activities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <Card key={lesson.id} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`w-full h-32 ${lesson.color} rounded-xl mb-4 flex items-center justify-center relative overflow-hidden`}>
                <div className="text-4xl text-white animate-bounce z-10">
                  {lesson.title.split(' ')[0]}
                </div>
                {completedTopics.includes(lesson.id) && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                    <Trophy className="w-4 h-4" />
                  </div>
                )}
              </div>

              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">
                {lesson.title}
              </h3>
              <p className="font-comic text-gray-600 text-sm mb-4">
                {lesson.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={`font-comic text-xs ${
                    lesson.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {lesson.difficulty}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700 font-comic text-xs">
                    {lesson.duration}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-comic text-sm font-bold text-yellow-600">
                    {lesson.difficulty === 'Easy' ? '10' : '15'} stars
                  </span>
                </div>
              </div>

              <Button 
                className={`w-full ${lesson.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
                onClick={() => setSelectedLesson(lesson.id)}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnglishAdventure;
