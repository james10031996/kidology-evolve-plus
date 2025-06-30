
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Eye, Save, X, Palette, Image as ImageIcon, Type } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  emoji: string;
  textColor: string;
  backgroundColor: string;
  image?: string;
  points: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  courseId: string;
  topicId: string;
  questions: QuizQuestion[];
  timeLimit: number;
  passingScore: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdAt: string;
}

const AdminQuizManager = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'Basic Math Quiz',
      description: 'Test your basic math skills',
      courseId: 'math-basics',
      topicId: 'addition',
      questions: [
        {
          id: '1',
          question: 'What is 2 + 2?',
          options: ['3', '4', '5', '6'],
          correctAnswer: 1,
          explanation: '2 + 2 equals 4',
          emoji: '🔢',
          textColor: '#000000',
          backgroundColor: '#f0f9ff',
          points: 10
        }
      ],
      timeLimit: 300,
      passingScore: 70,
      difficulty: 'Easy',
      createdAt: '2024-01-15'
    }
  ]);

  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewQuiz, setPreviewQuiz] = useState<Quiz | null>(null);
  const [newQuiz, setNewQuiz] = useState<Partial<Quiz>>({
    title: '',
    description: '',
    courseId: '',
    topicId: '',
    questions: [],
    timeLimit: 300,
    passingScore: 70,
    difficulty: 'Easy'
  });

  const courses = [
    { id: 'math-basics', name: 'Mathematics', topics: ['Numbers', 'Addition', 'Subtraction', 'Shapes'] },
    { id: 'english-basics', name: 'English', topics: ['Alphabets', 'Colors', 'Animals', 'Body Parts'] },
    { id: 'science-basics', name: 'Science', topics: ['Experiments', 'Planets', 'Weather', 'Animals'] },
    { id: 'art-basics', name: 'Art', topics: ['Drawing', 'Coloring', 'Crafts', 'Creativity'] }
  ];

  const colorOptions = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Black', value: '#000000' }
  ];

  const backgroundOptions = [
    { name: 'Light Blue', value: '#f0f9ff' },
    { name: 'Light Green', value: '#f0fdf4' },
    { name: 'Light Purple', value: '#faf5ff' },
    { name: 'Light Pink', value: '#fdf2f8' },
    { name: 'Light Orange', value: '#fff7ed' },
    { name: 'Light Yellow', value: '#fefce8' },
    { name: 'White', value: '#ffffff' },
    { name: 'Light Gray', value: '#f9fafb' }
  ];

  const emojiOptions = ['🤔', '📚', '🎯', '💡', '🌟', '🔥', '🎨', '🔬', '🔢', '📖', '🎵', '🌈', '⭐', '🎪', '🚀', '🎭'];

  const handleCreateQuiz = () => {
    if (newQuiz.title && newQuiz.description && newQuiz.courseId) {
      const quiz: Quiz = {
        id: Date.now().toString(),
        title: newQuiz.title,
        description: newQuiz.description,
        courseId: newQuiz.courseId,
        topicId: newQuiz.topicId || '',
        questions: newQuiz.questions || [],
        timeLimit: newQuiz.timeLimit || 300,
        passingScore: newQuiz.passingScore || 70,
        difficulty: newQuiz.difficulty || 'Easy',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setQuizzes([...quizzes, quiz]);
      setNewQuiz({
        title: '',
        description: '',
        courseId: '',
        topicId: '',
        questions: [],
        timeLimit: 300,
        passingScore: 70,
        difficulty: 'Easy'
      });
      setIsCreating(false);
    }
  };

  const handleDeleteQuiz = (id: string) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
  };

  const addQuestionToQuiz = (quizId: string, question: QuizQuestion) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === quizId 
        ? { ...quiz, questions: [...quiz.questions, question] }
        : quiz
    ));
  };

  const updateQuestion = (quizId: string, questionId: string, updatedQuestion: QuizQuestion) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === quizId 
        ? {
            ...quiz,
            questions: quiz.questions.map(q => 
              q.id === questionId ? updatedQuestion : q
            )
          }
        : quiz
    ));
  };

  const deleteQuestion = (quizId: string, questionId: string) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === quizId 
        ? {
            ...quiz,
            questions: quiz.questions.filter(q => q.id !== questionId)
          }
        : quiz
    ));
  };

  const createNewQuestion = (): QuizQuestion => ({
    id: Date.now().toString(),
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    emoji: '🤔',
    textColor: '#000000',
    backgroundColor: '#f0f9ff',
    points: 10
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-fredoka font-bold gradient-purple bg-clip-text text-transparent mb-2">
            🧠 Quiz Management System
          </h2>
          <p className="text-gray-600 font-comic">
            Create interactive quizzes with custom styling and multimedia content
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="gradient-purple text-white hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Quiz
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="p-6 border-purple-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{quiz.questions[0]?.emoji || '🧠'}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 font-fredoka text-lg">
                    {quiz.title}
                  </h4>
                  <p className="text-sm text-gray-500 font-comic">
                    {courses.find(c => c.id === quiz.courseId)?.name || 'General'}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleDeleteQuiz(quiz.id)}
                size="sm"
                variant="destructive"
                className="opacity-70 hover:opacity-100"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>

            <p className="text-gray-600 font-comic text-sm mb-4">
              {quiz.description}
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 font-comic">Questions:</span>
                <span className="font-bold text-purple-600">{quiz.questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-comic">Time Limit:</span>
                <span className="font-bold text-gray-700">{quiz.timeLimit}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-comic">Passing Score:</span>
                <span className="font-bold text-green-600">{quiz.passingScore}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-comic">Difficulty:</span>
                <Badge className={`${
                  quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {quiz.difficulty}
                </Badge>
              </div>
            </div>

            <div className="flex justify-between mt-6 pt-4 border-t border-purple-100">
              <Button size="sm" variant="outline" className="text-xs border-purple-200" onClick={() => setEditingQuiz(quiz)}>
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button size="sm" className="gradient-purple text-white text-xs" onClick={() => setPreviewQuiz(quiz)}>
                <Eye className="w-3 h-3 mr-1" />
                Preview
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Quiz Dialog */}
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-white via-purple-50 to-pink-50">
          <DialogHeader>
            <DialogTitle className="font-fredoka text-2xl text-purple-700">
              🎨 Create New Quiz
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="font-comic font-bold text-purple-800">Quiz Title</Label>
                <Input
                  value={newQuiz.title}
                  onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                  placeholder="Enter quiz title..."
                  className="font-comic"
                />
              </div>
              
              <div>
                <Label className="font-comic font-bold text-purple-800">Description</Label>
                <Textarea
                  value={newQuiz.description}
                  onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                  placeholder="Describe the quiz..."
                  className="font-comic"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-comic font-bold text-purple-800">Course</Label>
                  <Select onValueChange={(value) => setNewQuiz({ ...newQuiz, courseId: value })}>
                    <SelectTrigger className="font-comic">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="font-comic font-bold text-purple-800">Topic</Label>
                  <Select onValueChange={(value) => setNewQuiz({ ...newQuiz, topicId: value })}>
                    <SelectTrigger className="font-comic">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.find(c => c.id === newQuiz.courseId)?.topics.map((topic) => (
                        <SelectItem key={topic} value={topic.toLowerCase()}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="font-comic font-bold text-purple-800">Time Limit (s)</Label>
                  <Input
                    type="number"
                    value={newQuiz.timeLimit}
                    onChange={(e) => setNewQuiz({ ...newQuiz, timeLimit: parseInt(e.target.value) })}
                    className="font-comic"
                  />
                </div>
                
                <div>
                  <Label className="font-comic font-bold text-purple-800">Passing Score (%)</Label>
                  <Input
                    type="number"
                    value={newQuiz.passingScore}
                    onChange={(e) => setNewQuiz({ ...newQuiz, passingScore: parseInt(e.target.value) })}
                    className="font-comic"
                  />
                </div>
                
                <div>
                  <Label className="font-comic font-bold text-purple-800">Difficulty</Label>
                  <Select onValueChange={(value) => setNewQuiz({ ...newQuiz, difficulty: value as 'Easy' | 'Medium' | 'Hard' })}>
                    <SelectTrigger className="font-comic">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 p-4 rounded-xl">
              <h3 className="font-fredoka text-lg text-purple-600 mb-3">Preview</h3>
              <div className="space-y-2">
                <h4 className="font-comic text-xl font-bold text-gray-800">
                  {newQuiz.title || 'Quiz Title'}
                </h4>
                <p className="text-gray-600 font-comic text-sm">
                  {newQuiz.description || 'Quiz description will appear here...'}
                </p>
                <div className="text-sm font-comic text-purple-500 mt-2">
                  {courses.find(c => c.id === newQuiz.courseId)?.name || 'Course'} • {newQuiz.difficulty || 'Difficulty'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsCreating(false)} className="font-comic">
              Cancel
            </Button>
            <Button onClick={handleCreateQuiz} className="gradient-purple text-white font-comic">
              Create Quiz
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quiz Preview Dialog */}
      {previewQuiz && (
        <Dialog open={!!previewQuiz} onOpenChange={() => setPreviewQuiz(null)}>
          <DialogContent className="max-w-4xl bg-gradient-to-br from-white via-blue-50 to-purple-50">
            <DialogHeader>
              <DialogTitle className="font-fredoka text-2xl text-blue-700">
                🎯 Quiz Preview: {previewQuiz.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-fredoka text-xl font-bold text-gray-800 mb-2">
                  {previewQuiz.title}
                </h3>
                <p className="font-comic text-gray-600 mb-4">
                  {previewQuiz.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-blue-100 text-blue-700">
                    {previewQuiz.questions.length} Questions
                  </Badge>
                  <Badge className="bg-green-100 text-green-700">
                    {previewQuiz.timeLimit}s Time Limit
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-700">
                    {previewQuiz.passingScore}% Passing Score
                  </Badge>
                </div>
              </div>
              
              {previewQuiz.questions.map((question, index) => (
                <div 
                  key={question.id} 
                  className="p-4 rounded-xl shadow-lg"
                  style={{ 
                    backgroundColor: question.backgroundColor,
                    color: question.textColor 
                  }}
                >
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{question.emoji}</span>
                    <h4 className="font-comic font-bold text-lg">
                      Question {index + 1}: {question.question}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {question.options.map((option, optIndex) => (
                      <div 
                        key={optIndex}
                        className={`p-2 rounded font-comic ${
                          optIndex === question.correctAnswer 
                            ? 'bg-green-200 text-green-800 font-bold' 
                            : 'bg-white/50 text-gray-700'
                        }`}
                      >
                        {String.fromCharCode(65 + optIndex)}. {option}
                      </div>
                    ))}
                  </div>
                  
                  {question.explanation && (
                    <div className="bg-white/50 p-3 rounded-lg">
                      <p className="font-comic text-sm">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={() => setPreviewQuiz(null)} 
                className="gradient-blue text-white font-comic"
              >
                Close Preview
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminQuizManager;
