
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Play, CheckCircle, Star, Trophy, Book, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';

interface Lesson {
  id: number;
  title: string;
  content: string;
  interactive: React.ReactNode;
  completed: boolean;
}

const MathBasics = () => {
  const navigate = useNavigate();
  const { updateStars } = useUser();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [count, setCount] = useState(0);
  const [additionAnswer, setAdditionAnswer] = useState('');
  const [subtractionAnswer, setSubtractionAnswer] = useState('');
  const [practiceScore, setPracticeScore] = useState(0);

  const lessons: Lesson[] = [
    {
      id: 1,
      title: "Introduction to Numbers",
      content: "Numbers are everywhere! Let's learn about counting from 1 to 10. Numbers help us understand how many things we have.",
      interactive: (
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-2xl">
          <h4 className="font-fredoka font-bold text-xl mb-4 text-center">🔢 Count with Me!</h4>
          <div className="grid grid-cols-5 gap-4 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => setCount(num)}
                className={`w-16 h-16 rounded-xl font-fredoka font-bold text-xl transition-all duration-300 ${
                  count === num 
                    ? 'bg-orange-400 text-white scale-110 shadow-lg' 
                    : 'bg-white text-orange-600 hover:bg-orange-100 shadow-md'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="text-center">
            <div className="text-6xl mb-4">
              {'🌟'.repeat(count)}
            </div>
            <p className="font-comic text-lg text-gray-700">
              You selected: <span className="font-bold text-orange-600">{count}</span>
            </p>
            <p className="font-comic text-gray-600">Click different numbers to see them come to life!</p>
          </div>
        </div>
      ),
      completed: false
    },
    {
      id: 2,
      title: "Addition: Putting Things Together",
      content: "Addition means putting things together! When we add, we get MORE. The + symbol means 'plus' or 'add'.",
      interactive: (
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl">
          <h4 className="font-fredoka font-bold text-xl mb-4 text-center">🍎 Apple Addition!</h4>
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">
              {'🍎'.repeat(3)} + {'🍎'.repeat(2)} = ?
            </div>
            <p className="font-comic text-lg text-gray-700 mb-4">
              3 apples + 2 apples = ?
            </p>
            <input
              type="number"
              value={additionAnswer}
              onChange={(e) => setAdditionAnswer(e.target.value)}
              className="w-20 h-12 text-center text-xl font-fredoka font-bold border-2 border-green-300 rounded-xl"
              placeholder="?"
            />
            <div className="mt-4">
              {additionAnswer === '5' ? (
                <div className="text-green-600 font-comic font-bold animate-bounce">
                  🎉 Correct! 3 + 2 = 5! 🎉
                </div>
              ) : additionAnswer && additionAnswer !== '5' ? (
                <div className="text-orange-600 font-comic">
                  Try again! Count all the apples together.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ),
      completed: false
    },
    {
      id: 3,
      title: "Subtraction: Taking Things Away",
      content: "Subtraction means taking things away! When we subtract, we get LESS. The - symbol means 'minus' or 'take away'.",
      interactive: (
        <div className="bg-gradient-to-r from-red-100 to-pink-100 p-6 rounded-2xl">
          <h4 className="font-fredoka font-bold text-xl mb-4 text-center">🍪 Cookie Subtraction!</h4>
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">
              {'🍪'.repeat(5)} - {'❌'.repeat(2)} = ?
            </div>
            <p className="font-comic text-lg text-gray-700 mb-4">
              5 cookies - 2 eaten cookies = ?
            </p>
            <input
              type="number"
              value={subtractionAnswer}
              onChange={(e) => setSubtractionAnswer(e.target.value)}
              className="w-20 h-12 text-center text-xl font-fredoka font-bold border-2 border-red-300 rounded-xl"
              placeholder="?"
            />
            <div className="mt-4">
              {subtractionAnswer === '3' ? (
                <div className="text-green-600 font-comic font-bold animate-bounce">
                  🎉 Perfect! 5 - 2 = 3! 🎉
                </div>
              ) : subtractionAnswer && subtractionAnswer !== '3' ? (
                <div className="text-orange-600 font-comic">
                  Try again! How many cookies are left?
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ),
      completed: false
    },
    {
      id: 4,
      title: "Shapes and Counting",
      content: "Let's explore different shapes while we count! Shapes are all around us, and we can count their sides too!",
      interactive: (
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-2xl">
          <h4 className="font-fredoka font-bold text-xl mb-4 text-center">🔷 Shape Counter!</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { shape: '🔴', name: 'Circle', count: 3 },
              { shape: '🔷', name: 'Diamond', count: 4 },
              { shape: '🔺', name: 'Triangle', count: 2 },
              { shape: '⭐', name: 'Star', count: 5 }
            ].map((item) => (
              <div key={item.name} className="bg-white p-4 rounded-xl text-center shadow-lg hover:shadow-xl transition-all">
                <div className="text-4xl mb-2">
                  {item.shape.repeat(item.count)}
                </div>
                <p className="font-comic font-bold text-gray-700">{item.count} {item.name}s</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="font-comic text-lg text-gray-700 mb-2">
              Total shapes: <span className="font-bold text-purple-600">14</span>
            </p>
            <p className="font-comic text-gray-600">Can you count all the shapes?</p>
          </div>
        </div>
      ),
      completed: false
    },
    {
      id: 5,
      title: "Practice Time!",
      content: "Great job learning! Now let's practice everything we've learned with some fun problems!",
      interactive: (
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl">
          <h4 className="font-fredoka font-bold text-xl mb-4 text-center">🌟 Math Practice!</h4>
          <div className="space-y-4">
            {[
              { question: "2 + 3 = ?", answer: 5, emoji: "🎈" },
              { question: "7 - 4 = ?", answer: 3, emoji: "🚀" },
              { question: "Count the hearts: ❤️❤️❤️❤️❤️❤️", answer: 6, emoji: "❤️" }
            ].map((problem, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-lg">
                <p className="font-comic text-lg text-gray-700 mb-2">{problem.question}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{problem.emoji}</span>
                  <span className="font-fredoka font-bold text-xl text-green-600">{problem.answer}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button
              onClick={() => setPracticeScore(practiceScore + 10)}
              className="gradient-orange text-white font-comic font-bold px-6 py-3 rounded-full"
            >
              ⭐ Great Job! Score: {practiceScore}
            </Button>
          </div>
        </div>
      ),
      completed: false
    }
  ];

  const completeLesson = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
      updateStars(5);
    }
  };

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const progress = ((completedLessons.length) / lessons.length) * 100;
  const lesson = lessons[currentLesson];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/courses')}
            className="mr-4 font-comic"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Course Header */}
          <Card className="p-8 mb-8 bg-white rounded-3xl shadow-xl">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">🔢</div>
              <h1 className="font-fredoka font-bold text-4xl gradient-text mb-4">
                Math Basics for Beginners
              </h1>
              <p className="font-comic text-lg text-gray-600 mb-6">
                Learn numbers, counting, addition, and subtraction in a fun and interactive way!
              </p>
              
              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Book className="w-5 h-5 text-blue-600" />
                  <span className="font-comic text-gray-700">{lessons.length} Lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="font-comic text-gray-700">{completedLessons.length * 5} Stars Earned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-orange-600" />
                  <span className="font-comic text-gray-700">{Math.round(progress)}% Complete</span>
                </div>
              </div>
              
              <Progress value={progress} className="h-3 rounded-full" />
            </div>
          </Card>

          {/* Lesson Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-white p-2 rounded-2xl shadow-lg">
              {lessons.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentLesson(index)}
                  className={`w-12 h-12 rounded-xl font-fredoka font-bold transition-all duration-300 ${
                    currentLesson === index
                      ? 'bg-orange-400 text-white scale-110'
                      : completedLessons.includes(index)
                        ? 'bg-green-400 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {completedLessons.includes(index) ? (
                    <CheckCircle className="w-6 h-6 mx-auto" />
                  ) : (
                    index + 1
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Current Lesson */}
          <Card className="p-8 mb-8 bg-white rounded-3xl shadow-xl">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-orange-100 text-orange-700 border-orange-200 font-comic">
                  Lesson {currentLesson + 1} of {lessons.length}
                </Badge>
                {completedLessons.includes(currentLesson) && (
                  <Badge className="bg-green-100 text-green-700 border-green-200 font-comic">
                    ✅ Completed
                  </Badge>
                )}
              </div>
              
              <h2 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
                {lesson.title}
              </h2>
              
              <p className="font-comic text-lg text-gray-700 mb-6 leading-relaxed">
                {lesson.content}
              </p>
            </div>

            {/* Interactive Content */}
            <div className="mb-8">
              {lesson.interactive}
            </div>

            {/* Lesson Actions */}
            <div className="flex justify-between items-center">
              <Button
                onClick={prevLesson}
                disabled={currentLesson === 0}
                variant="outline"
                className="font-comic font-bold px-6 py-3 rounded-full disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="space-x-4">
                {!completedLessons.includes(currentLesson) && (
                  <Button
                    onClick={completeLesson}
                    className="gradient-green text-white font-comic font-bold px-8 py-3 rounded-full"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Lesson
                  </Button>
                )}
              </div>

              <Button
                onClick={nextLesson}
                disabled={currentLesson === lessons.length - 1}
                className="gradient-orange text-white font-comic font-bold px-6 py-3 rounded-full disabled:opacity-50"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Course Completion */}
          {completedLessons.length === lessons.length && (
            <Card className="p-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl text-center shadow-xl animate-scale-in">
              <Trophy className="w-20 h-20 text-yellow-600 mx-auto mb-4 animate-bounce" />
              <h2 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
                🎉 Course Complete! 🎉
              </h2>
              <p className="font-comic text-lg text-gray-700 mb-6">
                Congratulations! You've mastered Math Basics and earned {completedLessons.length * 5} stars!
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => navigate('/courses')}
                  className="gradient-blue text-white font-comic font-bold px-8 py-3 rounded-full"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Explore More Courses
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MathBasics;
