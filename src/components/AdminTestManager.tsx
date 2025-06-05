
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  courseId: string;
}

interface Course {
  id: string;
  name: string;
  questionCount: number;
}

const AdminTestManager = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      explanation: '2 + 2 equals 4',
      courseId: 'math-basics'
    },
    {
      id: '2',
      question: 'Which color do you get when you mix red and blue?',
      options: ['Green', 'Purple', 'Orange', 'Yellow'],
      correctAnswer: 1,
      explanation: 'Red and blue make purple',
      courseId: 'art-basics'
    }
  ]);

  const [courses] = useState<Course[]>([
    { id: 'math-basics', name: 'Math Basics', questionCount: 1 },
    { id: 'art-basics', name: 'Art Basics', questionCount: 1 },
    { id: 'science-intro', name: 'Science Introduction', questionCount: 0 }
  ]);

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    courseId: 'math-basics'
  });

  const handleAddQuestion = () => {
    if (newQuestion.question && newQuestion.options?.every(opt => opt.trim())) {
      const question: Question = {
        id: Date.now().toString(),
        question: newQuestion.question,
        options: newQuestion.options as string[],
        correctAnswer: newQuestion.correctAnswer || 0,
        explanation: newQuestion.explanation || '',
        courseId: newQuestion.courseId || 'math-basics'
      };
      setQuestions([...questions, question]);
      setNewQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
        courseId: 'math-basics'
      });
    }
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion({ ...question });
  };

  const handleSaveEdit = () => {
    if (editingQuestion) {
      setQuestions(questions.map(q => 
        q.id === editingQuestion.id ? editingQuestion : q
      ));
      setEditingQuestion(null);
    }
  };

  const updateNewQuestionOption = (index: number, value: string) => {
    const newOptions = [...(newQuestion.options || ['', '', '', ''])];
    newOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: newOptions });
  };

  const updateEditingQuestionOption = (index: number, value: string) => {
    if (editingQuestion) {
      const newOptions = [...editingQuestion.options];
      newOptions[index] = value;
      setEditingQuestion({ ...editingQuestion, options: newOptions });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-fredoka font-bold gradient-blue bg-clip-text text-transparent mb-2">
          📝 Course Tests Management
        </h2>
        <p className="text-gray-600 font-comic">
          Create and manage test questions for different courses
        </p>
      </div>

      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-blue-100 rounded-xl p-1">
          <TabsTrigger value="questions" className="rounded-lg font-comic font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600">
            📋 Manage Questions
          </TabsTrigger>
          <TabsTrigger value="add" className="rounded-lg font-comic font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600">
            ➕ Add New Question
          </TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          <div className="grid gap-4">
            {courses.map((course) => (
              <Card key={course.id} className="p-6 border-blue-200">
                <h3 className="text-xl font-fredoka font-bold text-gray-800 mb-4">
                  {course.name} ({questions.filter(q => q.courseId === course.id).length} questions)
                </h3>
                
                <div className="space-y-3">
                  {questions
                    .filter(q => q.courseId === course.id)
                    .map((question) => (
                      <Card key={question.id} className="p-4 bg-blue-50 border-blue-200">
                        {editingQuestion?.id === question.id ? (
                          <div className="space-y-3">
                            <Textarea
                              value={editingQuestion.question}
                              onChange={(e) => setEditingQuestion({
                                ...editingQuestion,
                                question: e.target.value
                              })}
                              placeholder="Question text"
                              className="font-comic"
                            />
                            
                            {editingQuestion.options.map((option, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Input
                                  value={option}
                                  onChange={(e) => updateEditingQuestionOption(index, e.target.value)}
                                  placeholder={`Option ${index + 1}`}
                                  className="font-comic"
                                />
                                <input
                                  type="radio"
                                  name="correct-answer-edit"
                                  checked={editingQuestion.correctAnswer === index}
                                  onChange={() => setEditingQuestion({
                                    ...editingQuestion,
                                    correctAnswer: index
                                  })}
                                  className="w-4 h-4 text-green-600"
                                />
                              </div>
                            ))}
                            
                            <div className="flex justify-end space-x-2">
                              <Button
                                onClick={() => setEditingQuestion(null)}
                                variant="outline"
                                size="sm"
                              >
                                <X className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                              <Button
                                onClick={handleSaveEdit}
                                className="gradient-green text-white"
                                size="sm"
                              >
                                <Save className="w-3 h-3 mr-1" />
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-gray-800 font-comic flex-1">
                                {question.question}
                              </h4>
                              <div className="flex space-x-1 ml-4">
                                <Button
                                  onClick={() => handleEditQuestion(question)}
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-300"
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  onClick={() => handleDeleteQuestion(question.id)}
                                  size="sm"
                                  variant="destructive"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              {question.options.map((option, index) => (
                                <div 
                                  key={index}
                                  className={`p-2 rounded font-comic ${
                                    index === question.correctAnswer 
                                      ? 'bg-green-100 text-green-700 font-bold' 
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {option}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </Card>
                    ))}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add">
          <Card className="p-6 border-blue-200">
            <h3 className="text-xl font-fredoka font-bold text-gray-800 mb-6">
              ➕ Add New Question
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-comic font-bold text-gray-700 mb-2">
                  Course
                </label>
                <select
                  value={newQuestion.courseId}
                  onChange={(e) => setNewQuestion({ ...newQuestion, courseId: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg font-comic"
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-comic font-bold text-gray-700 mb-2">
                  Question
                </label>
                <Textarea
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  placeholder="Enter the question..."
                  className="font-comic"
                />
              </div>
              
              <div>
                <label className="block text-sm font-comic font-bold text-gray-700 mb-2">
                  Answer Options
                </label>
                {(newQuestion.options || ['', '', '', '']).map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input
                      value={option}
                      onChange={(e) => updateNewQuestionOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="font-comic"
                    />
                    <input
                      type="radio"
                      name="correct-answer"
                      checked={newQuestion.correctAnswer === index}
                      onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="text-sm text-gray-600 font-comic">Correct</span>
                  </div>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-comic font-bold text-gray-700 mb-2">
                  Explanation (Optional)
                </label>
                <Textarea
                  value={newQuestion.explanation}
                  onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                  placeholder="Explain why this is the correct answer..."
                  className="font-comic"
                />
              </div>
              
              <Button
                onClick={handleAddQuestion}
                className="w-full gradient-blue text-white font-comic font-bold py-3 rounded-full"
                disabled={!newQuestion.question || !newQuestion.options?.every(opt => opt.trim())}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTestManager;
