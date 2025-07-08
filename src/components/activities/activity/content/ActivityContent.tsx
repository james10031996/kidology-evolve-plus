
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabsContent } from '@/components/ui/tabs';
import StorySection from '../StorySection';
import ActivitySection from '../ActivitySection';
import CreativeTools from '../../creativeTools/CreativeTools';
import { stories, poems, activityCategories } from './ActivityContentData';

const ActivityContent = () => {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleActivityAction = (activity: any) => {
    if (activity.route) {
      navigate(activity.route);
    } else if (activity.action) {
      if (typeof activity.action === 'string' && activity.action.includes('🎵')) {
        alert(activity.action);
      } else {
        setSelectedTool(activity.action);
      }
    }
  };

  // Process activities to add action handlers
  const processActivities = (activities: any[]) => {
    return activities.map(activity => ({
      ...activity,
      action: () => handleActivityAction(activity)
    }));
  };

  return (
    <>
      <TabsContent value="stories" className="space-y-8">
        <StorySection stories={stories} type="stories" />
      </TabsContent>

      <TabsContent value="poems-stories" className="space-y-8">
        <StorySection stories={poems} type="poems" />
      </TabsContent>

      <TabsContent value="creative" className="space-y-8">
        <ActivitySection 
          activities={processActivities(activityCategories.creative)} 
          gradientClass="gradient-purple" 
        />
      </TabsContent>

      <TabsContent value="math" className="space-y-8">
        <ActivitySection 
          activities={processActivities(activityCategories.math)} 
          gradientClass="gradient-purple" 
        />
      </TabsContent>

      <TabsContent value="art" className="space-y-8">
        <ActivitySection 
          activities={processActivities(activityCategories.art)} 
          gradientClass="gradient-purple" 
        />
      </TabsContent>

      <TabsContent value="science" className="space-y-8">
        <ActivitySection 
          activities={processActivities(activityCategories.science)} 
          gradientClass="gradient-purple" 
        />
      </TabsContent>

      <TabsContent value="music" className="space-y-8">
        <ActivitySection 
          activities={processActivities(activityCategories.music)} 
          gradientClass="gradient-purple" 
        />
      </TabsContent>

      {selectedTool && (
        <CreativeTools
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </>
  );
};

export default ActivityContent;
