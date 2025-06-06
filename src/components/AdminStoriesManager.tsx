
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Plus, Trash2, Edit, Eye } from 'lucide-react';
import AdminAddContent from './AdminAddContent';

interface Story {
  id: string;
  title: string;
  type: 'poem' | 'story';
  pages: {
    text: string;
    animation: string;
    backgroundColor: string;
  }[];
  author?: string;
  createdBy?: string;
  createdAt: string;
}

const AdminStoriesManager = () => {
  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      title: 'The Magic Forest Adventure',
      type: 'story',
      author: 'Luna Writer',
      createdBy: 'admin@example.com',
      createdAt: '2024-01-15',
      pages: [
        {
          text: "Welcome to the magical forest where Luna the fairy lives!",
          animation: "fly-around",
          backgroundColor: "from-green-100 to-emerald-100"
        }
      ]
    },
    {
      id: '2',
      title: 'Space Explorer Mission',
      type: 'story',
      author: 'Captain Cosmo',
      createdBy: 'admin@example.com',
      createdAt: '2024-01-20',
      pages: [
        {
          text: "Captain Cosmo puts on his shiny space suit!",
          animation: "scale-in",
          backgroundColor: "from-blue-100 to-indigo-100"
        }
      ]
    }
  ]);

  const [selectedTab, setSelectedTab] = useState('manage');

  const handleAddStory = (newContent: {
    title: string;
    type: 'poem' | 'story';
    pages: {
      text: string;
      animation: string;
      backgroundColor: string;
    }[];
    author?: string;
    createdBy?: string;
  }) => {
    const newStory: Story = {
      id: Date.now().toString(),
      ...newContent,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setStories(prev => [...prev, newStory]);
    setSelectedTab('manage');
  };

  const handleDeleteStory = (id: string) => {
    setStories(prev => prev.filter(story => story.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-fredoka font-bold gradient-purple bg-clip-text text-transparent mb-2">
          📚 Stories Management
        </h2>
        <p className="text-gray-600 font-comic">
          Create and manage magical stories for children
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-purple-100 rounded-xl p-1">
          <TabsTrigger value="manage" className="rounded-lg font-comic font-bold data-[state=active]:bg-white data-[state=active]:text-purple-600">
            📖 Manage Stories
          </TabsTrigger>
          <TabsTrigger value="add" className="rounded-lg font-comic font-bold data-[state=active]:bg-white data-[state=active]:text-purple-600">
            ✨ Add New Story
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-fredoka font-bold text-gray-800">
              📚 Story Library ({stories.length})
            </h3>
            <Button 
              onClick={() => setSelectedTab('add')}
              className="gradient-purple text-white hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Story
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stories.map((story) => (
              <Card key={story.id} className="p-4 border-purple-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 font-comic text-sm">
                        {story.title}
                      </h4>
                      <p className="text-xs text-gray-500 font-comic">
                        {story.type === 'story' ? '📖 Story' : '🎭 Poem'}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDeleteStory(story.id)}
                    size="sm"
                    variant="destructive"
                    className="opacity-70 hover:opacity-100"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-comic">Author:</span>
                    <span className="font-bold text-gray-700">{story.author || 'Anonymous'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-comic">Pages:</span>
                    <span className="font-bold text-purple-600">{story.pages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-comic">Created:</span>
                    <span className="font-bold text-gray-700">{story.createdAt}</span>
                  </div>
                </div>

                <div className="flex justify-between mt-4 pt-3 border-t border-purple-100">
                  <Button size="sm" variant="outline" className="text-xs border-purple-200">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" className="gradient-purple text-white text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {stories.length === 0 && (
            <Card className="p-12 text-center border-purple-200">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-fredoka font-bold text-gray-700 mb-2">
                No Stories Yet
              </h3>
              <p className="text-gray-500 font-comic mb-4">
                Start creating magical stories for children!
              </p>
              <Button 
                onClick={() => setSelectedTab('add')}
                className="gradient-purple text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Story
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="add">
          <Card className="border-purple-200">
            <AdminAddContent onAdd={handleAddStory} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminStoriesManager;
