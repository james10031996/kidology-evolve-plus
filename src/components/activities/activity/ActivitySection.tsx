
import { Tabs } from '@/components/ui/tabs';
import ActivityHeader from './ActivityHeader';
import ActivityTabs from './ActivityTabs';
import ActivityContent from './ActivityContent';
import ActivityExtras from './ActivityExtras';

const ActivitySection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <ActivityHeader />

        <Tabs defaultValue="stories" className="w-full">
          <ActivityTabs />
          <ActivityContent />
        </Tabs>

        <ActivityExtras />
      </div>
    </section>
  );
};

export default ActivitySection;
