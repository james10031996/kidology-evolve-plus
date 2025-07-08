
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import GameCompletionPopup from '@/components/game/game/GameCompletionPopup';
import InteractiveQuiz from '../quiz/InteractiveQuiz';
import EnglishLessonCard from './components/EnglishLessonCard';
import AlphabetGrid from './components/AlphabetGrid';
import PhonicsCards from './components/PhonicsCards';
import { englishLessonsData, alphabetLetters, phonicsWords, quizQuestions } from './data/englishData';

const EnglishAdventure = () => {
  const navigate = useNavigate();
  const { updateStars, updateProgress } = useUser();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [completionData, setCompletionData] = useState({ score: 0, stars: 0, gameName: '' });

  const completeLesson = (lessonId: string) => {
    if (!completedTopics.includes(lessonId)) {
      setCompletedTopics([...completedTopics, lessonId]);
      const lesson = englishLessonsData.find(l => l.id === lessonId);
      
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
    const lesson = englishLessonsData.find(l => l.id === currentQuiz.lessonId);
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
    const lesson = englishLessonsData.find(l => l.id === selectedLesson);
    
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

          {selectedLesson === 'alphabet' && (
            <div className="space-y-8">
              <AlphabetGrid letters={alphabetLetters} />
              <div className="text-center">
                <Button onClick={() => completeLesson('alphabet')} className="gradient-blue text-white font-comic font-bold px-8 py-3 rounded-full text-lg">
                  <Trophy className="w-5 h-5 mr-2" />
                  Complete Alphabet Lesson
                </Button>
              </div>
            </div>
          )}

          {selectedLesson === 'phonics' && (
            <div className="space-y-8">
              <PhonicsCards words={phonicsWords} />
              <div className="text-center">
                <Button onClick={() => completeLesson('phonics')} className="gradient-green text-white font-comic font-bold px-8 py-3 rounded-full text-lg">
                  <Trophy className="w-5 h-5 mr-2" />
                  Complete Phonics Lesson
                </Button>
              </div>
            </div>
          )}
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
          {englishLessonsData.map((lesson, index) => (
            <EnglishLessonCard
              key={lesson.id}
              lesson={lesson}
              index={index}
              isCompleted={completedTopics.includes(lesson.id)}
              onSelect={setSelectedLesson}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnglishAdventure;
