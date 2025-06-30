
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, SkipForward, Volume2 } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  mood: string;
  emoji: string;
}

interface MusicPlayerProps {
  songs: Song[];
  onEnergyUpdate: (energy: number) => void;
}

const MusicPlayer = ({ songs, onEnergyUpdate }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);

  const getMoodColor = (mood: string) => {
    switch(mood) {
      case 'Happy': return 'bg-yellow-100 text-yellow-700';
      case 'Energetic': return 'bg-red-100 text-red-700';
      case 'Playful': return 'bg-blue-100 text-blue-700';
      case 'Calm': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      onEnergyUpdate(5);
    }
  };

  const nextSong = () => {
    setCurrentSong((currentSong + 1) % songs.length);
  };

  return (
    <Card className="p-6 bg-white rounded-2xl border-0 shadow-lg">
      <div className="text-center mb-4">
        <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">
          🎧 Music Player
        </h3>
        
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6 mb-4">
          <div className="text-4xl mb-3">{songs[currentSong].emoji}</div>
          <h4 className="font-fredoka font-bold text-lg text-gray-800 mb-1">
            {songs[currentSong].title}
          </h4>
          <p className="font-comic text-gray-600 mb-2">{songs[currentSong].artist}</p>
          <div className="flex justify-center space-x-2 mb-4">
            <Badge className={`font-comic text-xs ${getMoodColor(songs[currentSong].mood)}`}>
              {songs[currentSong].mood}
            </Badge>
            <Badge variant="outline" className="font-comic text-xs">
              {songs[currentSong].genre}
            </Badge>
            <Badge variant="outline" className="font-comic text-xs">
              {songs[currentSong].duration}
            </Badge>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={togglePlay}
            size="lg"
            className="gradient-pink text-white font-comic rounded-full"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          <Button
            onClick={nextSong}
            size="lg"
            variant="outline"
            className="rounded-full"
          >
            <SkipForward className="w-6 h-6" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full"
          >
            <Volume2 className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MusicPlayer;
