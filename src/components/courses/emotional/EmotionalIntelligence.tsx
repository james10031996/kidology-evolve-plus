
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Star, Trophy, Smile, Frown, Angry, Surprised } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import GameCompletionPopup from '@/components/game/game/GameCompletionPopup';
import EnhancedInteractiveQuiz from '../quiz/EnhancedInteractiveQuiz';

const EmotionalIntelligence = () => {
  const navigate = useNavigate();
  const { updateStars, updateProgress } = useUser();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [completionData, setCompletionData] = useState({ score: 0, stars: 0, gameName: '' });

  const lessons = [
    { 
      id: 'feelings', 
      title: '😊 Understanding Feelings', 
      description: 'Learn about different emotions and how to recognize them', 
      color: 'gradient-pink', 
      difficulty: 'Easy', 
      duration: '20 min',
      emoji: '❤️'
    },
    { 
      id: 'empathy', 
      title: '🤗 Caring for Others', 
      description: 'Discover empathy and how to understand others\' feelings', 
      color: 'gradient-blue', 
      difficulty: 'Easy', 
      duration: '18 min',
      emoji: '🤝'
    },
    { 
      id: 'kindness', 
      title: '🌟 Acts of Kindness', 
      description: 'Learn how small acts of kindness make a big difference', 
      color: 'gradient-green', 
      difficulty: 'Easy', 
      duration: '15 min',
      emoji: '💝'
    },
    { 
      id: 'managing-emotions', 
      title: '🧘 Managing Big Feelings', 
      description: 'Learn healthy ways to handle strong emotions', 
      color: 'gradient-purple', 
      difficulty: 'Medium', 
      duration: '25 min',
      emoji: '🌈'
    },
    { 
      id: 'friendship', 
      title: '👫 Building Friendships', 
      description: 'Discover how to make and keep good friends', 
      color: 'gradient-orange', 
      difficulty: 'Medium', 
      duration: '22 min',
      emoji: '🎈'
    }
  ];

  const emotions = [
    { name: 'Happy', emoji: '😊', color: 'text-yellow-500', description: 'When something good happens!' },
    { name: 'Sad', emoji: '😢', color: 'text-blue-500', description: 'When we feel disappointed or hurt.' },
    { name: 'Angry', emoji: '😠', color: 'text-red-500', description: 'When something feels unfair or frustrating.' },
    { name: 'Excited', emoji: '🤩', color: 'text-purple-500', description: 'When we look forward to something!' },
    { name: 'Worried', emoji: '😰', color: 'text-orange-500', description: 'When we think about problems.' },
    { name: 'Surprised', emoji: '😲', color: 'text-green-500', description: 'When something unexpected happens!' }
  ];

  const quizQuestions = {
    feelings: [
      {
        id: '1',
        question: 'How might someone feel if their friend shares a toy with them?',
        options: ['Happy and grateful', 'Angry and upset', 'Scared and worried', 'Bored and tired'],
        correctAnswer: 0,
        explanation: 'When friends are kind and share, it makes us feel happy and grateful! 😊',
        concept: 'Understanding positive emotions in social situations',
        emoji: '😊',
        animation: 'bounce'
      },
      {
        id: '2',
        question: 'What should you do when you feel very angry?',
        options: ['Hit something', 'Take deep breaths and count to 10', 'Scream loudly', 'Run away'],
        correctAnswer: 1,
        explanation: 'Taking deep breaths helps calm our body and mind when we feel angry! 🌬️',
        concept: 'Healthy ways to manage strong emotions',
        emoji: '🧘',
        animation: 'pulse'
      }
    ]
  };

  const renderFeelingsLesson = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="text-8xl mb-4">❤️</div>
        <h2 className="font-fredoka text-4xl font-bold text-pink-700 mb-4">
          Let's Explore Our Feelings! 🌈
        </h2>
        <p className="font-comic text-xl text-gray-700">
          Feelings are like colors - we have many different ones! 🎨
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emotions.map((emotion, index) => (
          <Card key={emotion.name} className={`p-6 card-magic hover-lift animate-fade-in delay-${index * 100}`}>
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">{emotion.emoji}</div>
              <h3 className={`font-fredoka text-2xl font-bold mb-2 ${emotion.color}`}>
                {emotion.name}
              </h3>
              <p className="font-comic text-gray-600">
                {emotion.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-yellow-200 card-magic">
        <div className="text-center">
          <div className="text-6xl mb-4">🌟</div>
          <h3 className="font-fredoka text-3xl font-bold text-orange-700 mb-4">
            Remember: All Feelings Are OK! ✨
          </h3>
          <p className="font-comic text-lg text-gray-700 leading-relaxed">
            It's normal to feel happy, sad, angry, or worried sometimes. 
            The important thing is to talk about your feelings with someone you trust! 💝
          </p>
        </div>
      </Card>

      <div className="text-center">
        <Button 
          onClick={() => completeLesson('feelings')} 
          className="gradient-pink text-white font-comic font-bold px-8 py-4 rounded-full text-xl hover-glow btn-magic"
        >
          <Trophy className="w-6 h-6 mr-2" />
          Complete Feelings Lesson! 🎉
        </Button>
      </div>
    </div>
  );

  const completeLesson = (lessonId: string) => {
    if (!completedTopics.includes(lessonId)) {
      setCompletedTopics([...completedTopics, lessonId]);
      const lesson = lessons.find(l => l.id === lessonId);
      
      if (quizQuestions[lessonId as keyof typeof quizQuestions]) {
        setCurrentQuiz({
          questions: quizQuestions[lessonId as keyof typeof quizQuestions],
          title: lesson?.title || 'Emotional Intelligence Quiz',
          subject: 'Emotional Intelligence',
          lessonId
        });
        setShowQuiz(true);
      } else {
        const stars = lesson?.difficulty === 'Easy' ? 10 : 15;
        updateStars(stars);
        updateProgress('Emotional Intelligence', 20);
        setCompletionData({
          score: stars * 10,
          stars: stars,
          gameName: lesson?.title || 'Emotional Intelligence Topic'
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
    updateProgress('Emotional Intelligence', 20);
    setCompletionData({
      score: score * 100,
      stars: totalStars,
      gameName: lesson?.title || 'Emotional Intelligence Topic'
    });
    setShowQuiz(false);
    setCurrentQuiz(null);
    setShowCompletion(true);
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
            <h1 className="font-fredoka font-bold text-5xl text-rainbow mb-4">
              {lesson?.title}
            </h1>
            <p className="font-comic text-xl text-gray-600">
              {lesson?.description}
            </p>
          </div>

          {selectedLesson === 'feelings' && renderFeelingsLesson()}
        </div>

        <GameCompletionPopup
          isOpen={showCompletion}
          onClose={() => setShowCompletion(false)}
          score={completionData.score}
          stars={completionData.stars}
          gameName={completionData.gameName}
        />

        {showQuiz && currentQuiz && (
          <EnhancedInteractiveQuiz
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/courses')} variant="ghost" className="mr-4 font-comic">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>

        <div className="text-center mb-12">
          <div className="text-8xl mb-6 animate-float">❤️</div>
          <h1 className="font-fredoka font-bold text-5xl text-rainbow mb-4">
            Emotional Intelligence 🌈
          </h1>
          <p className="font-comic text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Learn about feelings, kindness, and how to understand yourself and others better! 
            Building emotional intelligence helps us make friends and feel happier! ✨
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <Card key={lesson.id} className={`p-6 bg-white rounded-3xl shadow-xl hover-lift card-magic animate-fade-in delay-${index * 100}`}>
              <div className={`w-full h-32 ${lesson.color} rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden`}>
                <div className="text-5xl text-white animate-bounce z-10">
                  {lesson.emoji}
                </div>
                {completedTopics.includes(lesson.id) && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-2">
                    <Trophy className="w-5 h-5" />
                  </div>
                )}
              </div>

              <h3 className="font-fredoka font-bold text-2xl text-gray-800 mb-3">
                {lesson.title}
              </h3>
              <p className="font-comic text-gray-600 text-sm mb-6">
                {lesson.description}
              </p>

              <div className="flex items-center justify-between mb-6">
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
                className={`w-full ${lesson.color} text-white font-comic font-bold rounded-full hover-glow btn-magic transition-all duration-300`}
                onClick={() => setSelectedLesson(lesson.id)}
              >
                <Heart className="w-4 h-4 mr-2" />
                Start Learning! ✨
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmotionalIntelligence;
