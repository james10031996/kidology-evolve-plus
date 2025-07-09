// import { useState, useEffect } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft, Trophy, Star, Zap, Info, Volume2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '@/contexts/UserContext';
// import Header from '@/components/home/Header';
// import GameCompletionPopup from '@/components/game/game/GameCompletionPopup';
// import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// import confetti from 'canvas-confetti';
// import {levels} from './wordBuilderChallengeData';

// // 🔊 Optional: Add sounds for correct/wrong
// const correctSound = new Audio('/sounds/correct.mp3');
// const wrongSound = new Audio('/sounds/wrong.mp3');
// const tickSound = new Audio('/sounds/tick.mp3');

// let bonusSound: HTMLAudioElement | null = null;
// try {
//   bonusSound = new Audio('/sounds/bonus.mp3');
// } catch (e) {
//   console.warn('Bonus sound missing');
// }

// const WordBuilderChallenge = () => {
//   const navigate = useNavigate();
//   const { updateStars } = useUser();
//   const [currentLevel, setCurrentLevel] = useState(0);
//   const [score, setScore] = useState(0);
//   const [draggedLetters, setDraggedLetters] = useState<string[]>([]);
//   const [showCompletion, setShowCompletion] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [gameActive, setGameActive] = useState(true);
//   const [feedbackMsg, setFeedbackMsg] = useState('');
//   const [showHint, setShowHint] = useState(false);
//   const [hardMode, setHardMode] = useState(false);
//   const [showBonus, setShowBonus] = useState(false);
//   const [levelStartTime, setLevelStartTime] = useState<number>(Date.now());

  
//   const currentWord = levels[currentLevel];

//   const shuffleArray = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);
//   const [shuffledLetters, setShuffledLetters] = useState<string[]>(shuffleArray(currentWord.letters));

//   useEffect(() => {
//     if (timeLeft > 0 && gameActive) {
//       const timer = setTimeout(() => {
//         if (timeLeft <= 10) tickSound.play();
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);
//       return () => clearTimeout(timer);
//     } else if (timeLeft === 0 && gameActive) {
//       setGameActive(false);
//       setShowCompletion(true);
//     }
//   }, [timeLeft, gameActive]);

//   const handleDragEnd = (result: DropResult) => {
//     if (!result.destination) return;
//     const items = Array.from(draggedLetters);
//     const [moved] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, moved);
//     setDraggedLetters(items);
//   };


//   const correctWord = () => {
//     const solveTime = (Date.now() - levelStartTime) / 1000;
//     let bonus = 0;
//     if (solveTime <= 5) {
//       bonus = 5;
//       setShowBonus(true);
//       bonusSound?.play();
//       setTimeout(() => setShowBonus(false), 1500);
//     }
//     setFeedbackMsg(`✅ Great Job! ${bonus ? `⚡️ Bonus +${bonus}` : ''}`);
//     setScore((prev) => prev + 10 + bonus);
//     confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
//     correctSound.play();

//     setTimeout(() => {
//       if (currentLevel < levels.length - 1) {
//         setCurrentLevel((prev) => prev + 1);
//         setDraggedLetters([]);
//         setTimeLeft(60);
//         setLevelStartTime(Date.now());
//         if (levels[currentLevel + 1]) {
//           setShuffledLetters(shuffleArray(levels[currentLevel + 1].letters));
//         }
//         setFeedbackMsg('');
//       } else {
//         setGameActive(false);
//         setShowCompletion(true);
//       }
//     }, 1200);
//   };

//   const checkWord = () => {
//     if (draggedLetters.join('') === currentWord.word) {
//       correctWord();
//     } else {
//       setFeedbackMsg('❌ Wrong! Try again.');
//       wrongSound.play();
//       if (hardMode) {
//         setScore((prev) => Math.max(0, prev - 5));
//       }
//     }
//   };

//   const addLetter = (letter: string) => {
//     if (draggedLetters.length < currentWord.word.length) {
//       setDraggedLetters((prev) => [...prev, letter]);
//     }
//   };

//   const clearWord = () => {
//     setDraggedLetters([]);
//     setFeedbackMsg('');
//   };

//   const giveHint = () => {
//     setShowHint(true);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
//       <Header />
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex items-center mb-6">
//           <Button onClick={() => navigate('/games')} variant="ghost" className="mr-4 font-comic">
//             <ArrowLeft className="w-4 h-4 mr-2" /> Back to Games
//           </Button>
//         </div>

//         <div className="text-center mb-8">
//           <h1 className="font-fredoka font-bold text-5xl bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
//             🔤 Word Builder Challenge
//           </h1>
//           <p className="font-comic text-xl text-gray-700">Drag letters to build words! 🌟</p>
//         </div>

//         {/* Feedback message */}
//         {feedbackMsg && (
//           <div className={`text-xl font-bold text-center animate-bounce ${feedbackMsg.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
//             {feedbackMsg}
//           </div>
//         )}

//         {/* Bonus Animation */}
//         {showBonus && (
//           <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
//             <div className="bg-yellow-400 text-white font-fredoka text-4xl px-6 py-4 rounded-full shadow-lg animate-pulse flex items-center gap-2">
//               ⚡️ Bonus Round! +5
//             </div>
//           </div>
//         )}

//         <div className="max-w-4xl mx-auto">
//           {/* Score / Level / Time */}
//           <div className="grid md:grid-cols-3 gap-6 mb-8">
//             <Card className="p-6 bg-blue-100 border-2 border-blue-300">
//               <Trophy className="w-8 h-8 mx-auto text-yellow-600" />
//               <p className="font-fredoka text-lg">Score</p>
//               <p className="text-3xl">{score}</p>
//             </Card>
//             <Card className="p-6 bg-green-100 border-2 border-green-300">
//               <Zap className="w-8 h-8 mx-auto text-orange-600" />
//               <p className="font-fredoka text-lg">Level</p>
//               <p className="text-3xl">{currentLevel + 1}/{levels.length}</p>
//             </Card>
//             <Card className="p-6 bg-red-100 border-2 border-red-300">
//               <Star className="w-8 h-8 mx-auto text-red-600" />
//               <p className="font-fredoka text-lg">Time</p>
//               <p className="text-3xl">{timeLeft}s</p>
//             </Card>
//           </div>

//           {/* Main Game Card */}
//           <Card className="p-8 bg-white rounded-3xl shadow-lg border-4 border-orange-200">
//             <div className="text-center mb-6">
//               <div className="text-7xl animate-bounce">{currentWord.emoji}</div>
//               <h3 className="font-fredoka text-2xl mt-3">{currentWord.hint}</h3>
//             </div>

//             {/* Drag Area */}
//             <DragDropContext onDragEnd={handleDragEnd}>
//               <Droppable droppableId="droppable" direction="horizontal">
//                 {(provided) => (
//                   <div
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                     className="flex space-x-3 p-4 bg-purple-100 rounded-xl border border-dashed border-purple-400 min-h-[80px] justify-center"
//                   >
//                     {draggedLetters.map((letter, index) => (
//                       <Draggable key={`${letter}-${index}`} draggableId={`${letter}-${index}`} index={index}>
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold flex items-center justify-center rounded-lg shadow cursor-move hover:scale-105 transition"
//                           >
//                             {letter}
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>

//             {/* Letters Pool */}
//             <div className="flex flex-wrap justify-center mt-6 gap-3">
//               {shuffledLetters.map((letter, idx) => (
//                 <Button
//                   key={`${letter}-${idx}`}
//                   onClick={() => addLetter(letter)}
//                   className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xl font-bold rounded-lg shadow hover:scale-105 transition"
//                 >
//                   {letter}
//                 </Button>
//               ))}
//             </div>

//             {/* Controls */}
//             <div className="flex justify-center gap-4 mt-6">
//               <Button
//                 onClick={checkWord}
//                 className="bg-green-500 text-white px-6 py-3 rounded-full font-comic text-lg hover:scale-105 transition"
//                 disabled={draggedLetters.length !== currentWord.word.length}
//               >
//                 ✅ Check Word
//               </Button>
//               <Button
//                 onClick={clearWord}
//                 variant="outline"
//                 className="px-6 py-3 rounded-full text-lg"
//               >
//                 🗑 Clear
//               </Button>
//               <Button
//                 onClick={giveHint}
//                 variant="secondary"
//                 className="px-6 py-3 rounded-full text-lg"
//               >
//                 💡 Hint
//               </Button>
//             </div>

//             {/* Feedback Message */}
//             {feedbackMsg && (
//               <div className={`mt-4 text-xl font-bold text-center animate-bounce ${feedbackMsg.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
//                 {feedbackMsg}
//               </div>
//             )}

//             {/* Hint Highlight */}
//             {showHint && (
//               <div className="mt-2 text-center text-purple-700 font-comic">
//                 Hint: The word starts with <strong>{currentWord.word[0]}</strong>
//               </div>
//             )}
//           </Card>
//         </div>
//       </div>

//       <GameCompletionPopup
//         isOpen={showCompletion}
//         onClose={() => {
//           try {
//             updateStars(score);
//           } catch {
//             console.log('updateStars not available');
//           }
//           setShowCompletion(false);
//           navigate('/games');
//         }}
//         score={score}
//         stars={Math.min(3, Math.floor(score / 30))}
//         gameName="Word Builder Challenge"
//       />
//     </div>
//   );
// };

// export default WordBuilderChallenge;




import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import GameCompletionPopup from '@/components/game/game/GameCompletionPopup';
import { DropResult } from '@hello-pangea/dnd';
import confetti from 'canvas-confetti';
import { levels } from './wordBuilderChallengeData';
import GameHeader from './components/GameHeader';
import WordDisplay from './components/WordDisplay';
import LetterDragArea from './components/LetterDragArea';
import LettersPool from './components/LettersPool';
import GameControls from './components/GameControls';

// 🔊 Optional: Add sounds for correct/wrong
const correctSound = new Audio('/sounds/correct.mp3');
const wrongSound = new Audio('/sounds/wrong.mp3');
const tickSound = new Audio('/sounds/tick.mp3');

let bonusSound: HTMLAudioElement | null = null;
try {
  bonusSound = new Audio('/sounds/bonus.mp3');
} catch (e) {
  console.warn('Bonus sound missing');
}

const WordBuilderChallenge = () => {
  const navigate = useNavigate();
  const { updateStars } = useUser();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [draggedLetters, setDraggedLetters] = useState<string[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(true);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hardMode, setHardMode] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [levelStartTime, setLevelStartTime] = useState<number>(Date.now());

  const currentWord = levels[currentLevel];
  const shuffleArray = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>(shuffleArray(currentWord.letters));

  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timer = setTimeout(() => {
        if (timeLeft <= 10) tickSound.play();
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      setShowCompletion(true);
    }
  }, [timeLeft, gameActive]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(draggedLetters);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setDraggedLetters(items);
  };

  const correctWord = () => {
    const solveTime = (Date.now() - levelStartTime) / 1000;
    let bonus = 0;
    if (solveTime <= 5) {
      bonus = 5;
      setShowBonus(true);
      bonusSound?.play();
      setTimeout(() => setShowBonus(false), 1500);
    }
    setFeedbackMsg(`✅ Great Job! ${bonus ? `⚡️ Bonus +${bonus}` : ''}`);
    setScore((prev) => prev + 10 + bonus);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    correctSound.play();

    setTimeout(() => {
      if (currentLevel < levels.length - 1) {
        setCurrentLevel((prev) => prev + 1);
        setDraggedLetters([]);
        setTimeLeft(60);
        setLevelStartTime(Date.now());
        if (levels[currentLevel + 1]) {
          setShuffledLetters(shuffleArray(levels[currentLevel + 1].letters));
        }
        setFeedbackMsg('');
      } else {
        setGameActive(false);
        setShowCompletion(true);
      }
    }, 1200);
  };

  const checkWord = () => {
    if (draggedLetters.join('') === currentWord.word) {
      correctWord();
    } else {
      setFeedbackMsg('❌ Wrong! Try again.');
      wrongSound.play();
      if (hardMode) {
        setScore((prev) => Math.max(0, prev - 5));
      }
    }
  };

  const addLetter = (letter: string) => {
    if (draggedLetters.length < currentWord.word.length) {
      setDraggedLetters((prev) => [...prev, letter]);
    }
  };

  const clearWord = () => {
    setDraggedLetters([]);
    setFeedbackMsg('');
  };

  const giveHint = () => {
    setShowHint(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/games')} variant="ghost" className="mr-4 font-comic">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Games
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-fredoka font-bold text-5xl bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🔤 Word Builder Challenge
          </h1>
          <p className="font-comic text-xl text-gray-700">Drag letters to build words! 🌟</p>
        </div>

        {/* Bonus Animation */}
        {showBonus && (
          <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
            <div className="bg-yellow-400 text-white font-fredoka text-4xl px-6 py-4 rounded-full shadow-lg animate-pulse flex items-center gap-2">
              ⚡️ Bonus Round! +5
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <GameHeader 
            score={score}
            currentLevel={currentLevel}
            totalLevels={levels.length}
            timeLeft={timeLeft}
          />

          <Card className="p-8 bg-white rounded-3xl shadow-lg border-4 border-orange-200">
            <WordDisplay emoji={currentWord.emoji} hint={currentWord.hint} />
            <LetterDragArea draggedLetters={draggedLetters} onDragEnd={handleDragEnd} />
            <LettersPool shuffledLetters={shuffledLetters} onAddLetter={addLetter} />
            <GameControls 
              onCheckWord={checkWord}
              onClearWord={clearWord}
              onGiveHint={giveHint}
              isCheckDisabled={draggedLetters.length !== currentWord.word.length}
            />

            {/* Feedback Message */}
            {feedbackMsg && (
              <div className={`mt-4 text-xl font-bold text-center animate-bounce ${feedbackMsg.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                {feedbackMsg}
              </div>
            )}

            {/* Hint Highlight */}
            {showHint && (
              <div className="mt-2 text-center text-purple-700 font-comic">
                Hint: The word starts with <strong>{currentWord.word[0]}</strong>
              </div>
            )}
          </Card>
        </div>
      </div>

      <GameCompletionPopup
        isOpen={showCompletion}
        onClose={() => {
          try {
            updateStars(score);
          } catch {
            console.log('updateStars not available');
          }
          setShowCompletion(false);
          navigate('/games');
        }}
        score={score}
        stars={Math.min(3, Math.floor(score / 30))}
        gameName="Word Builder Challenge"
      />
    </div>
  );
};

export default WordBuilderChallenge;
