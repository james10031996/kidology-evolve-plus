
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Activities from "./pages/Activities";
import Games from "./pages/Games";
import Progress from "./pages/Progress";
import Parents from "./pages/Parents";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import MathBasics from "./pages/courses/MathBasics";
import NumberBubblePop from "./pages/activities/NumberBubblePop";
import LetterSafari from "./pages/activities/LetterSafari";
import MemoryPalace from "./pages/activities/MemoryPalace";
import ShapeSorter from "./pages/activities/ShapeSorter";
import MagicPaintStudio from "./pages/activities/MagicPaintStudio";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/math-basics" element={<MathBasics />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/games" element={<Games />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/parents" element={<Parents />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/activities/number-bubble-pop" element={<NumberBubblePop />} />
              <Route path="/activities/letter-safari" element={<LetterSafari />} />
              <Route path="/activities/memory-palace" element={<MemoryPalace />} />
              <Route path="/activities/shape-sorter" element={<ShapeSorter />} />
              <Route path="/activities/magic-paint-studio" element={<MagicPaintStudio />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
