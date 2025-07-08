
import { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import StoriesSection from './sections/StoriesSection';
import ActivitiesSection from './sections/ActivitiesSection';
import { activityData } from './data/activityContentData';

const ActivityContent = () => {
  const navigate = useNavigate();

  return (
    <>
      <TabsContent value="stories" className="space-y-8">
        <StoriesSection stories={activityData.stories} type="stories" />
      </TabsContent>

      <TabsContent value="poems-stories" className="space-y-8">
        <StoriesSection stories={activityData.poems} type="poems" />
      </TabsContent>

      <TabsContent value="creative" className="space-y-8">
        <ActivitiesSection 
          activities={activityData.creativeActivities} 
          title="🎨 Creative Activities"
          subtitle="Express your creativity with amazing art tools!"
          gradientClass="gradient-purple" 
        />
      </TabsContent>

      <TabsContent value="math" className="space-y-8">
        <ActivitiesSection 
          activities={activityData.mathActivities} 
          title="🔢 Math Adventures"
          subtitle="Discover the magic of numbers and shapes!"
          gradientClass="gradient-blue" 
        />
      </TabsContent>

      <TabsContent value="art" className="space-y-8">
        <ActivitiesSection 
          activities={activityData.artActivities} 
          title="🎨 Artistic Creations"
          subtitle="Create beautiful art and express yourself!"
          gradientClass="gradient-pink" 
        />
      </TabsContent>

      <TabsContent value="science" className="space-y-8">
        <ActivitiesSection 
          activities={activityData.scienceActivities} 
          title="🔬 Science Discoveries"
          subtitle="Explore the wonders of science!"
          gradientClass="gradient-green" 
        />
      </TabsContent>

      <TabsContent value="music" className="space-y-8">
        <ActivitiesSection 
          activities={activityData.musicActivities} 
          title="🎵 Musical Fun"
          subtitle="Make music and dance to the beat!"
          gradientClass="gradient-orange" 
        />
      </TabsContent>
    </>
  );
};

export default ActivityContent;
