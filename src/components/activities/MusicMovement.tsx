
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Music, Volume2, Play, Pause, SkipForward, Zap } from 'lucide-react';

const MusicMovement = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [energy, setEnergy] = useState(85);

  const musicActivities = [
    {
      id: 1,
      title: 'Rhythm Patterns',
      description: 'Clap along to different beats and rhythms',
      icon: '👏',
      type: 'rhythm',
      difficulty: 'Easy',
      duration: '5 min',
      completed: true
    },
    {
      id: 2,
      title: 'Dance Party',
      description: 'Follow fun dance moves to upbeat songs',
      icon: '💃',
      type: 'movement',
      difficulty: 'Easy',
      duration: '10 min',
      completed: false
    },
    {
      id: 3,
      title: 'Musical Instruments',
      description: 'Learn about different instruments and their sounds',
      icon: '🎸',
      type: 'instruments',
      difficulty: 'Medium',
      duration: '8 min',
      completed: false
    },
    {
      id: 4,
      title: 'Sing Along Songs',
      description: 'Practice singing with popular children\'s songs',
      icon: '🎤',
      type: 'singing',
      difficulty: 'Easy',
      duration: '6 min',
      completed: true
    }
  ];

  const songs = [
    {
      id: 1,
      title: 'Happy Learning Song',
      artist: 'Kids Music',
      duration: '2:30',
      genre: 'Educational',
      mood: 'Happy',
      emoji: '😊'
    },
    {
      id: 2,
      title: 'Animal Dance',
      artist: 'Fun Tunes',
      duration: '3:15',
      genre: 'Movement',
      mood: 'Energetic',
      emoji: '🐾'
    },
    {
      id: 3,
      title: 'Counting Song',
      artist: 'Math Music',
      duration: '2:45',
      genre: 'Math',
      mood: 'Playful',
      emoji: '🔢'
    },
    {
      id: 4,
      title: 'Bedtime Lullaby',
      artist: 'Calm Kids',
      duration: '4:00',
      genre: 'Relaxation',
      mood: 'Calm',
      emoji: '🌙'
    }
  ];

  const danceGames = [
    {
      id: 1,
      title: 'Freeze Dance',
      description: 'Dance when music plays, freeze when it stops!',
      icon: '🧊',
      players: '1+',
      difficulty: 'Easy'
    },
    {
      id: 2,
      title: 'Animal Moves',
      description: 'Move like different animals to the beat',
      icon: '🦘',
      players: '1+',
      difficulty: 'Easy'
    },
    {
      id: 3,
      title: 'Follow the Leader',
      description: 'Copy dance moves shown on screen',
      icon: '👯',
      players: '1+',
      difficulty: 'Medium'
    },
    {
      id: 4,
      title: 'Musical Statues',
      description: 'Stay still like a statue when music stops',
      icon: '🗿',
      players: '2+',
      difficulty: 'Easy'
    }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setEnergy(Math.min(100, energy + 5));
    }
  };

  const nextSong = () => {
    setCurrentSong((currentSong + 1) % songs.length);
  };

  const getMoodColor = (mood) => {
    switch(mood) {
      case 'Happy': return 'bg-yellow-100 text-yellow-700';
      case 'Energetic': return 'bg-red-100 text-red-700';
      case 'Playful': return 'bg-blue-100 text-blue-700';
      case 'Calm': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Music Header */}
      <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-pink rounded-full mx-auto mb-3 flex items-center justify-center">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            🎵 Music & Movement
          </h2>
          <p className="font-comic text-gray-600">
            Sing, dance, and move to learn through music and rhythm!
          </p>
        </div>

        {/* Energy Meter */}
        <div className="mt-6 bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <span className="font-comic font-bold text-gray-800">Energy Level</span>
            </div>
            <span className="font-comic text-sm text-gray-600">{energy}%</span>
          </div>
          <Progress value={energy} className="h-3" />
        </div>
      </Card>

      {/* Music Player */}
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

      {/* Music Activities */}
      <div className="grid md:grid-cols-2 gap-6">
        {musicActivities.map((activity) => (
          <Card key={activity.id} className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
            <div className="text-center mb-3">
              <div className="text-3xl mb-2">{activity.icon}</div>
              <h4 className="font-fredoka font-bold text-lg text-gray-800">{activity.title}</h4>
            </div>

            <p className="font-comic text-sm text-gray-600 mb-4 text-center">
              {activity.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <Badge className={`font-comic text-xs ${
                activity.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                activity.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {activity.difficulty}
              </Badge>
              <Badge variant="outline" className="font-comic text-xs">
                {activity.duration}
              </Badge>
            </div>

            <Button className={`w-full font-comic font-bold rounded-full ${
              activity.completed ? 'bg-gray-200 text-gray-600' : 'gradient-pink text-white'
            }`}>
              {activity.completed ? 'Play Again' : 'Start Activity'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Dance Games */}
      <div className="grid md:grid-cols-2 gap-6">
        {danceGames.map((game) => (
          <Card key={game.id} className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
            <div className="text-center mb-3">
              <div className="text-3xl mb-2">{game.icon}</div>
              <h4 className="font-fredoka font-bold text-lg text-gray-800">{game.title}</h4>
            </div>

            <p className="font-comic text-sm text-gray-600 mb-4 text-center">
              {game.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <Badge className={`font-comic text-xs ${
                game.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {game.difficulty}
              </Badge>
              <Badge variant="outline" className="font-comic text-xs">
                {game.players} players
              </Badge>
            </div>

            <Button className="w-full gradient-orange text-white font-comic font-bold rounded-full">
              Start Dancing!
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MusicMovement;
