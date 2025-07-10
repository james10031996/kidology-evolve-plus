import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';

const LetterSafari = lazy(() => import('./components/game/LetterSafari/LetterSafari'));
const PopTheLetterGame = lazy(() => import('./components/game/PopTheLetterGame/PopTheLetterGame'));
const MemoryMatchGame = lazy(() => import('./components/game/MemoryMatchGame/MemoryMatchGame'));
const NumberGuesserGame = lazy(() => import('./components/game/NumberGuesserGame/NumberGuesserGame'));
const QuizGame = lazy(() => import('./components/game/QuizGame/QuizGame'));
const MathWhizGame = lazy(() => import('./components/game/MathWhizGame/MathWhizGame'));
const WordPuzzleGame = lazy(() => import('./components/game/WordPuzzleGame/WordPuzzleGame'));
const TypingTutorGame = lazy(() => import('./components/game/TypingTutorGame/TypingTutorGame'));
const ConnectFourGame = lazy(() => import('./components/game/ConnectFourGame/ConnectFourGame'));
const Games = lazy(() => import('./components/game/game/Games'));
const LetterTypingChallenge = lazy(() => import('./components/game/LetterTypingChallenge/LetterTypingChallenge'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Suspense fallback={<div>Loading...</div>}><Games /></Suspense>} />
        <Route path="/games/letter-safari" element={<Suspense fallback={<div>Loading...</div>}><LetterSafari /></Suspense>} />
        <Route path="/games/pop-the-letter" element={<Suspense fallback={<div>Loading...</div>}><PopTheLetterGame /></Suspense>} />
        <Route path="/games/memory-match" element={<Suspense fallback={<div>Loading...</div>}><MemoryMatchGame /></Suspense>} />
        <Route path="/games/number-guesser" element={<Suspense fallback={<div>Loading...</div>}><NumberGuesserGame /></Suspense>} />
        <Route path="/games/quiz-game" element={<Suspense fallback={<div>Loading...</div>}><QuizGame /></Suspense>} />
        <Route path="/games/math-whiz" element={<Suspense fallback={<div>Loading...</div>}><MathWhizGame /></Suspense>} />
        <Route path="/games/word-puzzle" element={<Suspense fallback={<div>Loading...</div>}><WordPuzzleGame /></Suspense>} />
        <Route path="/games/typing-tutor" element={<Suspense fallback={<div>Loading...</div>}><TypingTutorGame /></Suspense>} />
        <Route path="/games/connect-four" element={<Suspense fallback={<div>Loading...</div>}><ConnectFourGame /></Suspense>} />
        <Route path="/games/word-safari-challenge" element={<Suspense fallback={<div>Loading...</div>}><LetterTypingChallenge /></Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;
