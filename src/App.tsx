
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Home from './components/home/Home';

const LetterSafari = lazy(() => import('./components/game/LetterSafari/LetterSafari'));
const PopTheLetterGame = lazy(() => import('./components/game/PopTheLetterGame/PopTheLetterGame'));
const Games = lazy(() => import('./components/game/game/Games'));
const LetterTypingChallenge = lazy(() => import('./components/game/LetterTypingChallenge/LetterTypingChallenge'));

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Suspense fallback={<div>Loading...</div>}><Games /></Suspense>} />
          <Route path="/games/letter-safari" element={<Suspense fallback={<div>Loading...</div>}><LetterSafari /></Suspense>} />
          <Route path="/games/pop-the-letter" element={<Suspense fallback={<div>Loading...</div>}><PopTheLetterGame /></Suspense>} />
          <Route path="/games/word-safari-challenge" element={<Suspense fallback={<div>Loading...</div>}><LetterTypingChallenge /></Suspense>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
