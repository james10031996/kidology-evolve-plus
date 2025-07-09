import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { UserProvider } from '@/contexts/UserContext';
import { Toaster } from '@/components/ui/sonner';
import Index from '@/pages/Index';
import Activities from '@/components/activities/activity/Activities';
import Courses from '@/components/courses/course/Courses';
import Games from '@/components/game/game/Games';
import Progress from '@/components/progress/Progress';
import Parents from '@/components/parents/Parents';
import Admin from '@/components/admin/Admin';
import NotFound from '@/pages/NotFound';
import Demo from '@/pages/Demo';

// Game Pages
import NumberBubblePop from '@/components/game/NumberBubblePop';
import LetterSafari from '@/components/game/LetterSafari/LetterSafari';
import MemoryPalace from '@/components/game/MemoryPalace';
import ShapeSorter from '@/components/game/ShapeSorter';
import MatchingGame from '@/components/game/MatchingGame/MatchingGame';
import PuzzleAssembly from '@/components/game/PuzzleAssembly/PuzzleAssembly';
import SearchMissingObject from '@/components/game/SearchMissingObject/SearchMissingObject';
import GeographyBubbleGame from '@/components/game/GeographyBubbleGame/GeographyBubbleGame';
import MathBubbleGame from '@/components/game/MathBubbleGame';
import ScienceBubbleGame from '@/components/game/ScienceBubbleGame/ScienceBubbleGame';

// Activity & Creative Tools 
import PaperCraftsTool from '@/components/activities/creativeTools/PaperCraftsTool';
import ColoringPagesTool from '@/components/activities/creativeTools/ColoringPagesTool';
import MandalaMaker from '@/components/activities/creativeTools/MandalaMaker';
import MagicPaintStudio from '@/components/activities/creativeTools/MagicPaintStudio';
import MusicMovement from '@/components/activities/creativeTools/MusicMovement';
import CreativeArts from '@/components/courses/creative/CreativeArts';

// Course Pages
import EnglishAdventure from '@/components/courses/english/EnglishAdventure';
import MathBasics from '@/components/courses/maths/MathBasics';
import MathAdventure from '@/components/courses/maths/MathAdventure';
import EnhancedMathAdventure from '@/components/courses/maths/EnhancedMathAdventure';
import ReadingAdventure from '@/components/courses/gk/ReadingAdventure';
import ScienceExplorers from '@/components/courses/science/ScienceExplorers';
import HistoryAdventures from '@/components/courses/history/HistoryAdventures';
import SocialMoral from '@/components/courses/social/SocialMoral';
import NatureExplorer from '@/components/courses/nature/NatureExplorer';
import GeographyExplorer from '@/components/courses/geography/GeographyExplorer';
import TimeAdventure from '@/components/courses/time/TimeAdventure';

// Add new game imports
import WordBuilderChallenge from '@/components/game/WordBuilderChallenge/WordBuilderChallenge';
import PatternDetective from '@/components/game/PatternDetective/PatternDetective';
import GeographyQuizAdventure from '@/components/quiz/GeographyQuizAdventure/GeographyQuizAdventure';

// Add new course imports
import EmotionalIntelligence from '@/components/courses/emotional/EmotionalIntelligence';
import FinancialLiteracy from '@/components/courses/financial/FinancialLiteracy';
import EnvironmentalHeroes from '@/components/courses/environmental/EnvironmentalHeroes';
import CulturalExplorer from '@/components/courses/cultural/CulturalExplorer';
import HealthNutrition from '@/components/courses/health/HealthNutrition';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/games" element={<Games />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/parents" element={<Parents />} />
                <Route path="/admin" element={<Admin />} />

                {/* Activity Game Routes */}
                <Route path="/activities/number-bubble-pop" element={<NumberBubblePop />} />
                <Route path="/activities/letter-safari" element={<LetterSafari />} />
                <Route path="/activities/memory-palace" element={<MemoryPalace />} />
                <Route path="/activities/shape-sorter" element={<ShapeSorter />} />
                <Route path="/games/puzzle-assembly" element={<PuzzleAssembly />} />
                <Route path="/games/search-missing-object" element={<SearchMissingObject />} />
                <Route path="/games/matching-game" element={<MatchingGame />} />
                <Route path="/games/geography-bubble-game" element={<GeographyBubbleGame />} />
                <Route path="/games/math-bubble-game" element={<MathBubbleGame />} />
                <Route path="/games/science-bubble-game" element={<ScienceBubbleGame />} />
                <Route path="/games/word-builder-challenge" element={<WordBuilderChallenge />} />
                <Route path="/games/pattern-detective" element={<PatternDetective />} />

                {/* Creative Tools Routes */}
                <Route path="/activities/paper-crafts" element={<PaperCraftsTool onClose={() => window.history.back()} />} />
                <Route path="/activities/coloring-pages-tool" element={<ColoringPagesTool onClose={() => window.history.back()} />} />
                <Route path="/activities/mandala-maker" element={<MandalaMaker />} />
                <Route path="/activities/music-movement" element={<MusicMovement />} />
                <Route path="/activities/magic-paint-studio" element={<MagicPaintStudio />} />

                {/* Course Routes */}
                <Route path="/courses/english-adventure" element={<EnglishAdventure />} />
                <Route path="/courses/math-basics" element={<MathBasics />} />
                <Route path="/courses/math-adventure" element={<MathAdventure />} />
                <Route path="/courses/enhanced-math-adventure" element={<EnhancedMathAdventure />} />
                <Route path="/courses/reading-adventure" element={<ReadingAdventure />} />
                <Route path="/courses/science-explorers" element={<ScienceExplorers />} />
                <Route path="/courses/history-adventures" element={<HistoryAdventures />} />
                <Route path="/courses/social-moral" element={<SocialMoral />} />
                <Route path="/courses/nature-explorer" element={<NatureExplorer />} />
                <Route path="/courses/geography-explorer" element={<GeographyExplorer />} />
                <Route path="/courses/time-adventurer" element={<TimeAdventure />} />
                <Route path="/activities/creative-arts" element={<CreativeArts />} />

                {/* New Quiz Routes */}
                
                <Route path="/quizes/geography-quiz-adventure" element={<GeographyQuizAdventure />} />

                {/* New Course Routes */}
                <Route path="/courses/emotional-intelligence" element={<EmotionalIntelligence />} />
                <Route path="/courses/financial-literacy" element={<FinancialLiteracy />} />
                <Route path="/courses/environmental-heroes" element={<EnvironmentalHeroes />} />
                <Route path="/courses/cultural-explorer" element={<CulturalExplorer />} />
                <Route path="/courses/health-nutrition" element={<HealthNutrition />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
