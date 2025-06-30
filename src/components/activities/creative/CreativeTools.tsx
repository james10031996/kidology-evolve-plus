
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import DigitalDrawingTool from './tools/DigitalDrawingTool';
import ColoringPagesTool from './tools/ColoringPagesTool';
import PaperCraftsTool from './tools/PaperCraftsTool';
import MusicMakerTool from './tools/MusicMakerTool';

interface CreativeToolsProps {
  tool: string;
  onClose: () => void;
}

const CreativeTools = ({ tool, onClose }: CreativeToolsProps) => {
  const getToolContent = () => {
    switch (tool) {
      case 'Digital Drawing':
        return <DigitalDrawingTool onClose={onClose} />;
      case 'Coloring Pages':
        return <ColoringPagesTool onClose={onClose} />;
      case 'Paper Crafts':
        return <PaperCraftsTool onClose={onClose} />;
      case 'Rhythm Maker':
        return <MusicMakerTool onClose={onClose} />;
      default:
        return <div className="text-center font-comic text-gray-600">Tool not found</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-7xl h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <h2 className="font-fredoka text-3xl gradient-purple bg-clip-text text-transparent">
              🎨 Creative Studio
            </h2>
            <Button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2"
              size="sm"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          {getToolContent()}
        </div>
      </div>
    </div>
  );
};

export default CreativeTools;
