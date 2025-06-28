
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

const ActivityTabs = () => {
  return (
    <div className="mb-8">
      <TabsList className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 w-full bg-white rounded-2xl p-2 shadow-lg">
        <TabsTrigger 
          value="stories" 
          className="rounded-xl font-comic font-bold text-xs lg:text-sm data-[state=active]:bg-orange-100 data-[state=active]:text-orange-600"
        >
          📚 Stories
        </TabsTrigger>
        <TabsTrigger 
          value="poems-stories" 
          className="rounded-xl font-comic font-bold text-xs lg:text-sm data-[state=active]:bg-rose-100 data-[state=active]:text-rose-600"
        >
          📖 Poems & Stories
        </TabsTrigger>
        <TabsTrigger 
          value="games" 
          className="rounded-xl font-comic font-bold text-xs lg:text-sm data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
        >
          🎮 Games
        </TabsTrigger>
        <TabsTrigger 
          value="math" 
          className="rounded-xl font-comic font-bold text-xs lg:text-sm data-[state=active]:bg-green-100 data-[state=active]:text-green-600"
        >
          🔢 Math
        </TabsTrigger>
        <TabsTrigger 
          value="art" 
          className="rounded-xl font-comic font-bold text-xs lg:text-sm data-[state=active]:bg-pink-100 data-[state=active]:text-pink-600"
        >
          🎨 Art
        </TabsTrigger>
        <TabsTrigger 
          value="science" 
          className="rounded-xl font-comic font-bold text-xs lg:text-sm data-[state=active]:bg-purple-100 data-[state=active]:text-purple-600"
        >
          🧪 Science
        </TabsTrigger>
        <TabsTrigger 
          value="music" 
          className="rounded-xl font-comic font-bold text-xs lg:text-sm data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-600"
        >
          🎵 Music
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default ActivityTabs;
