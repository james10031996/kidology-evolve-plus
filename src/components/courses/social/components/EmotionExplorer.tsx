
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Emotion {
  id: number;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

interface EmotionExplorerProps {
  emotions: Emotion[];
}

const EmotionExplorer = ({ emotions }: EmotionExplorerProps) => {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);

  return (
    <Card className="p-6 mb-6 bg-white rounded-2xl border-0 shadow-lg">
      <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 text-center">
        🎭 Emotion Explorer
      </h3>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        {emotions.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => setSelectedEmotion(emotion)}
            className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
              selectedEmotion?.id === emotion.id 
                ? `${emotion.color} ring-2 ring-gray-400` 
                : `${emotion.color} hover:shadow-md`
            }`}
          >
            <div className="text-2xl mb-2">{emotion.emoji}</div>
            <div className="font-comic font-bold text-gray-800 text-sm">{emotion.name}</div>
          </button>
        ))}
      </div>

      {selectedEmotion && (
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">{selectedEmotion.emoji}</div>
          <h4 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
            {selectedEmotion.name}
          </h4>
          <p className="font-comic text-gray-600 text-sm">
            {selectedEmotion.description}
          </p>
          <Button 
            size="sm" 
            className="mt-3 gradient-pink text-white font-comic rounded-full"
          >
            Practice This Emotion
          </Button>
        </div>
      )}
    </Card>
  );
};

export default EmotionExplorer;
