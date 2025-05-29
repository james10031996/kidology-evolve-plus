
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CoursesSection from '@/components/CoursesSection';
import ProgressDashboard from '@/components/ProgressDashboard';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <CoursesSection />
      <ProgressDashboard />
    </div>
  );
};

export default Index;
