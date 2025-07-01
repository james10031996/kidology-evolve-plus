
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Star, Download, Share2 } from 'lucide-react';

interface ColoringPagesToolProps {
  onClose: () => void;
}

const ColoringPagesTool = ({ onClose }: ColoringPagesToolProps) => {
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [completedPages, setCompletedPages] = useState<number[]>([]);

  const coloringPages = [
    { title: '🦋 Magical Butterfly', difficulty: 'Easy', category: 'Animals', stars: 3 },
    { title: '🌸 Enchanted Garden', difficulty: 'Medium', category: 'Nature', stars: 4 },
    { title: '🏰 Fantasy Castle', difficulty: 'Hard', category: 'Buildings', stars: 5 },
    { title: '🐾 Cute Animal Friends', difficulty: 'Easy', category: 'Animals', stars: 3 },
    { title: '🌈 Rainbow Paradise', difficulty: 'Medium', category: 'Nature', stars: 4 },
    { title: '🚀 Space Adventure', difficulty: 'Hard', category: 'Space', stars: 5 }
  ];

  const categories = ['All', 'Animals', 'Nature', 'Buildings', 'Space'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPages = coloringPages.filter(page => 
    activeCategory === 'All' || page.category === activeCategory
  );

  const completePage = (index: number) => {
    if (!completedPages.includes(index)) {
      setCompletedPages([...completedPages, index]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-fredoka text-3xl text-pink-700 mb-2">🖍️ Magical Coloring Pages</h3>
        <p className="font-comic text-gray-600">Choose your favorite coloring page and bring it to life!</p>
      </div>

      {/* Category Filter */}
      <Card className="p-4 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="flex justify-center space-x-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className={`font-comic mb-2 ${
                activeCategory === category 
                  ? 'gradient-pink text-white' 
                  : 'border-pink-300 hover:bg-pink-50'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </Card>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPages.map((page, index) => (
          <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-pink-200 bg-gradient-to-br from-white to-pink-50">
            <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl mb-4 flex items-center justify-center border-2 border-dashed border-pink-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100/30 to-purple-100/30"></div>
              <div className="text-center z-10">
                <div className="text-6xl mb-2 animate-bounce">{page.title.split(' ')[0]}</div>
                <p className="font-comic text-gray-600">Ready to color!</p>
                {completedPages.includes(index) && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-2">
                    ✓
                  </div>
                )}
              </div>
            </div>
            
            <h4 className="font-fredoka text-lg font-bold text-gray-800 mb-2">{page.title}</h4>
            
            <div className="flex justify-between items-center mb-3">
              <Badge className={`font-comic ${
                page.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                page.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {page.difficulty}
              </Badge>
              <div className="flex items-center space-x-1">
                {[...Array(page.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Button 
                className="w-full gradient-pink text-white font-comic hover:scale-105 transition-transform"
                onClick={() => completePage(index)}
              >
                <Palette className="w-4 h-4 mr-1" />
                Color It!
              </Button>
              
              {completedPages.includes(index) && (
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 font-comic">
                    <Download className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 font-comic">
                    <Share2 className="w-3 h-3 mr-1" />
                    Share
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" className="font-comic" onClick={onClose}>
          Back to Creative Studio
        </Button>
      </div>
    </div>
  );
};

export default ColoringPagesTool;
