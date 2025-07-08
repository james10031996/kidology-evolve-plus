
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concept: string;
  emoji: string;
  animation: string;
  visualType?: 'image' | 'interactive' | 'drag-drop';
  interactiveElements?: {
    type: 'drag-letters' | 'pattern-match' | 'click-sequence';
    items: string[];
    correctSequence?: number[];
  };
}

export const defaultQuizQuestions: Record<string, QuizQuestion[]> = {
  english: [
    {
      id: '1',
      question: 'Which letters make the word "CAT"?',
      options: ['C-A-T', 'D-O-G', 'B-I-R-D', 'F-I-S-H'],
      correctAnswer: 0,
      explanation: 'CAT is spelled with the letters C-A-T. Each letter makes its own sound!',
      concept: 'Letter recognition and spelling',
      emoji: '🐱',
      animation: 'bounce',
      visualType: 'drag-drop',
      interactiveElements: {
        type: 'drag-letters',
        items: ['C', 'A', 'T', 'D', 'O', 'G'],
        correctSequence: [0, 1, 2]
      }
    },
    {
      id: '2',
      question: 'What sound does "B" make?',
      options: ['Buh', 'Duh', 'Sss', 'Mmm'],
      correctAnswer: 0,
      explanation: 'The letter B makes a "Buh" sound, like in Ball, Book, and Bee!',
      concept: 'Phonics and letter sounds',
      emoji: '🅱️',
      animation: 'pulse'
    }
  ],
  math: [
    {
      id: '1',
      question: 'Complete the pattern: 🟦🟨🟦🟨🟦?',
      options: ['🟨', '🟦', '🟪', '🟩'],
      correctAnswer: 0,
      explanation: 'The pattern alternates between blue and yellow squares!',
      concept: 'Pattern recognition',
      emoji: '🧩',
      animation: 'bounce',
      visualType: 'interactive',
      interactiveElements: {
        type: 'pattern-match',
        items: ['🟦', '🟨', '🟦', '🟨', '🟦', '?']
      }
    }
  ],
  geography: [
    {
      id: '1',
      question: 'Which landmark is in Paris?',
      options: ['Eiffel Tower', 'Big Ben', 'Statue of Liberty', 'Colosseum'],
      correctAnswer: 0,
      explanation: 'The Eiffel Tower is the famous landmark in Paris, France!',
      concept: 'World landmarks and geography',
      emoji: '🗼',
      animation: 'bounce'
    }
  ]
};
