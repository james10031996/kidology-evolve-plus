
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CoursesSection from '@/components/CoursesSection';
import ActivitySection from '@/components/ActivitySection';
import ProgressDashboard from '@/components/ProgressDashboard';
import ParentDashboard from '@/components/ParentDashboard';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <CoursesSection />
      <ActivitySection />
      <ProgressDashboard />
      <ParentDashboard />
    </div>
  );
};

export default Index;
