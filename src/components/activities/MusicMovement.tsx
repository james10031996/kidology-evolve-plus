
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Music, Zap } from 'lucide-react';
import MusicPlayer from './music/MusicPlayer';
import ActivityCard from './music/ActivityCard';
import Header from '@/components/home/Header';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const MusicMovement = () => {
  const [energy, setEnergy] = useState(85);
  const navigate = useNavigate();

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
      completed: false,
      route: 'https://www.virtualinstrumentshub.com/blog'
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

  const danceGames = [
    {
      id: 1,
      title: 'Freeze Dance',
      description: 'Dance when music plays, freeze when it stops!',
      icon: '🧊',
      type: 'dance',
      difficulty: 'Easy',
      duration: '5 min',
      completed: false
    },
    {
      id: 2,
      title: 'Animal Moves',
      description: 'Move like different animals to the beat',
      icon: '🦘',
      type: 'dance',
      difficulty: 'Easy',
      duration: '7 min',
      completed: false
    },
    {
      id: 3,
      title: 'Follow the Leader',
      description: 'Copy dance moves shown on screen',
      icon: '👯',
      type: 'dance',
      difficulty: 'Medium',
      duration: '8 min',
      completed: false
    },
    {
      id: 4,
      title: 'Musical Statues',
      description: 'Stay still like a statue when music stops',
      icon: '🗿',
      type: 'dance',
      difficulty: 'Easy',
      duration: '6 min',
      completed: false
    }
  ];

  const updateEnergy = (increment: number) => {
    setEnergy(prev => Math.min(100, prev + increment));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      {/* Music Header */}
      <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border-0 shadow-lg">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/activities')}
            className="mr-4 font-comic"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Activities
          </Button>
        </div> 
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
      <MusicPlayer songs={songs} onEnergyUpdate={updateEnergy} />

      {/* Music Activities */}
      <div className="grid md:grid-cols-2 gap-6">
        {musicActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} gradientClass="gradient-pink" />
        ))}
      </div>

      {/* Dance Games */}
      <div className="grid md:grid-cols-2 gap-6">
        {danceGames.map((game) => (
          <ActivityCard key={game.id} activity={game} gradientClass="gradient-orange" />
        ))}
      </div>
    </div>
  );
};

export default MusicMovement;
