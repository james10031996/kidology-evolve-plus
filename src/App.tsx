
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { UserProvider } from '@/contexts/UserContext';
import { Toaster } from '@/components/ui/sonner';
import Index from '@/pages/Index';
import Activities from '@/pages/Activities';
import Courses from '@/pages/Courses';
import Games from '@/pages/Games';
import Progress from '@/pages/Progress';
import Parents from '@/pages/Parents';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import Demo from '@/pages/Demo';

// Activity Pages
import NumberBubblePop from '@/pages/activities/NumberBubblePop';
import LetterSafari from '@/pages/activities/LetterSafari';
import MemoryPalace from '@/pages/activities/MemoryPalace';
import ShapeSorter from '@/pages/activities/ShapeSorter';
import MagicPaintStudio from '@/pages/activities/MagicPaintStudio';

// Course Pages
import MathBasics from '@/pages/courses/MathBasics';
import MathAdventure from '@/pages/courses/MathAdventure';
import ReadingAdventure from '@/pages/courses/ReadingAdventure';
import ScienceExplorers from '@/pages/courses/ScienceExplorers';

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
