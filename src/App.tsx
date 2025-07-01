
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { UserProvider } from '@/contexts/UserContext';
import { Toaster } from '@/components/ui/sonner';
import Index from '@/pages/Index';
import Activities from '@/components/activities/activity/Activities';
import Courses from '@/components/courses/course/Courses';
import Games from '@/components/game/Games';
import Progress from '@/components/progress/Progress';
import Parents from '@/components/parents/Parents';
import Admin from '@/components/admin/Admin';
import NotFound from '@/pages/NotFound';
import Demo from '@/pages/Demo';


// Activity Pages
import NumberBubblePop from '@/components/game/NumberBubblePop';
import LetterSafari from '@/components/game/LetterSafari/LetterSafari';
import MemoryPalace from '@/components/game/MemoryPalace';
import ShapeSorter from '@/components/game/ShapeSorter';
import PuzzleAssembly from '@/components/game/PuzzleAssembly/PuzzleAssembly';
import SearchMissingObject from '@/components/game/SearchMissingObject/SearchMissingObject';
import MagicPaintStudio from '@/components/activities/creativeTools/MagicPaintStudio';
import MusicMovement from '@/components/activities/MusicMovement';
import InteractiveLearningRoute from '@/components/activities/activity/InteractiveLearningRoute';
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
                
                {/* Activity Routes */}
                <Route path="/activities/number-bubble-pop" element={<NumberBubblePop />} />
                <Route path="/activities/letter-safari" element={<LetterSafari />} />
                <Route path="/activities/memory-palace" element={<MemoryPalace />} />
                <Route path="/activities/shape-sorter" element={<ShapeSorter />} />
                <Route path="/activities/magic-paint-studio" element={<MagicPaintStudio />} />
                <Route path="/activities/music-movement" element={<MusicMovement />} />
                <Route path="/activities/interactive-learning" element={<InteractiveLearningRoute />} />
                <Route path="/games/puzzle-assembly" element={<PuzzleAssembly />} />
                <Route path="/games/search-missing-object" element={<SearchMissingObject />} />
                <Route path="/activies/creative-arts" element={<CreativeArts />} />
                
                {/* Course Routes */}
                <Route path="/courses/math-basics" element={<MathBasics />} />
                <Route path="/courses/math-adventure" element={<MathAdventure />} />
                <Route path="/courses/enhanced-math-adventure" element={<EnhancedMathAdventure />} />
                <Route path="/courses/reading-adventure" element={<ReadingAdventure />} />
                <Route path="/courses/science-explorers" element={<ScienceExplorers />} />
                <Route path="/courses/history-adventures" element={<HistoryAdventures />} />
                <Route path="/courses/social-moral" element={<SocialMoral />} />
                <Route path="/courses/nature-explorer" element={<NatureExplorer />} />
                <Route path="/courses/geography-explorer" element={<GeographyExplorer />} />

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
