
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
import LetterSafari from '@/components/game/LetterSafari';
import MemoryPalace from '@/components/game/MemoryPalace';
import ShapeSorter from '@/components/game/ShapeSorter';
import MagicPaintStudio from '@/components/game/MagicPaintStudio';

// Course Pages
import MathBasics from '@/components/courses/maths/MathBasics';
import MathAdventure from '@/components/courses/maths/MathAdventure';
import ReadingAdventure from '@/components/courses/gk/ReadingAdventure';
import ScienceExplorers from '@/components/courses/science/ScienceExplorers';

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
                
                {/* Course Routes */}
                <Route path="/courses/math-basics" element={<MathBasics />} />
                <Route path="/courses/math-adventure" element={<MathAdventure />} />
                <Route path="/courses/reading-adventure" element={<ReadingAdventure />} />
                <Route path="/courses/science-explorers" element={<ScienceExplorers />} />
                
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