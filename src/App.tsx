
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
import Progress from "./pages/Progress";
import Parents from "./pages/Parents";
import NotFound from "./pages/NotFound";
import MathBasics from "./pages/courses/MathBasics";
import NumberBubblePop from "./pages/activities/NumberBubblePop";

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
              <Route path="/activities/number-bubble-pop" element={<NumberBubblePop />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/parents" element={<Parents />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
