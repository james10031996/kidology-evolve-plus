import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Download, 
  Wifi, 
  WifiOff, 
  HardDrive, 
  Package, 
  BookOpen,
  Gamepad2,
  Palette,
  Music,
  Brain,
  CheckCircle,
  Clock,
  Star,
  Trash2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface LearningPack {
  id: string;
  title: string;
  description: string;
  category: 'math' | 'english' | 'science' | 'art' | 'music' | 'games';
  size: number; // in MB
  downloadProgress?: number;
  isDownloaded: boolean;
  isDownloading: boolean;
  activities: number;
  duration: string;
  ageGroup: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: string;
  rating: number;
}

const OfflineLearningPacks = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [learningPacks, setLearningPacks] = useState<LearningPack[]>([
    {
      id: '1',
      title: 'Math Adventure Pack',
      description: 'Complete math learning with games, exercises, and interactive lessons',
      category: 'math',
      size: 45,
      isDownloaded: true,
      isDownloading: false,
      activities: 25,
      duration: '3-4 hours',
      ageGroup: '6-9 years',
      difficulty: 'beginner',
      lastUpdated: '2024-01-15',
      rating: 4.8
    },
    {
      id: '2',
      title: 'English Reading Quest',
      description: 'Stories, phonics, and vocabulary building activities',
      category: 'english',
      size: 38,
      isDownloaded: false,
      isDownloading: true,
      downloadProgress: 65,
      activities: 20,
      duration: '2-3 hours',
      ageGroup: '5-8 years',
      difficulty: 'beginner',
      lastUpdated: '2024-01-18',
      rating: 4.9
    },
    {
      id: '3',
      title: 'Science Explorers',
      description: 'Experiments, facts, and interactive science activities',
      category: 'science',
      size: 52,
      isDownloaded: false,
      isDownloading: false,
      activities: 18,
      duration: '4-5 hours',
      ageGroup: '7-10 years',
      difficulty: 'intermediate',
      lastUpdated: '2024-01-12',
      rating: 4.7
    },
    {
      id: '4',
      title: 'Creative Art Studio',
      description: 'Drawing, coloring, and creative art projects',
      category: 'art',
      size: 28,
      isDownloaded: true,
      isDownloading: false,
      activities: 15,
      duration: '2-3 hours',
      ageGroup: '4-8 years',
      difficulty: 'beginner',
      lastUpdated: '2024-01-20',
      rating: 4.6
    },
    {
      id: '5',
      title: 'Music & Rhythm',
      description: 'Musical games, rhythm activities, and instrument learning',
      category: 'music',
      size: 35,
      isDownloaded: false,
      isDownloading: false,
      activities: 12,
      duration: '2 hours',
      ageGroup: '5-9 years',
      difficulty: 'beginner',
      lastUpdated: '2024-01-14',
      rating: 4.5
    },
    {
      id: '6',
      title: 'Super Games Collection',
      description: 'Educational games for all subjects',
      category: 'games',
      size: 65,
      isDownloaded: false,
      isDownloading: false,
      activities: 30,
      duration: '5-6 hours',
      ageGroup: '6-12 years',
      difficulty: 'intermediate',
      lastUpdated: '2024-01-16',
      rating: 4.9
    }
  ]);

  const categories = ['all', 'math', 'english', 'science', 'art', 'music', 'games'];

  const filteredPacks = selectedCategory === 'all' 
    ? learningPacks 
    : learningPacks.filter(pack => pack.category === selectedCategory);

  const downloadedPacks = learningPacks.filter(pack => pack.isDownloaded);
  const totalDownloadedSize = downloadedPacks.reduce((sum, pack) => sum + pack.size, 0);
  const downloadingPacks = learningPacks.filter(pack => pack.isDownloading);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'math': return <Brain className="w-5 h-5" />;
      case 'english': return <BookOpen className="w-5 h-5" />;
      case 'science': return <Package className="w-5 h-5" />;
      case 'art': return <Palette className="w-5 h-5" />;
      case 'music': return <Music className="w-5 h-5" />;
      case 'games': return <Gamepad2 className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleDownload = (packId: string) => {
    setLearningPacks(prev => prev.map(pack => 
      pack.id === packId 
        ? { ...pack, isDownloading: true, downloadProgress: 0 }
        : pack
    ));
    
    // Simulate download progress
    const interval = setInterval(() => {
      setLearningPacks(prev => prev.map(pack => {
        if (pack.id === packId && pack.isDownloading) {
          const newProgress = (pack.downloadProgress || 0) + Math.random() * 20;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...pack, isDownloading: false, downloadProgress: 100, isDownloaded: true };
          }
          return { ...pack, downloadProgress: newProgress };
        }
        return pack;
      }));
    }, 500);
  };

  const handleDelete = (packId: string) => {
    setLearningPacks(prev => prev.map(pack => 
      pack.id === packId 
        ? { ...pack, isDownloaded: false, downloadProgress: 0 }
        : pack
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-8 h-8" />
              <h1 className="font-fredoka font-bold text-3xl">📦 Offline Learning Packs</h1>
            </div>
            <p className="font-comic text-lg opacity-90">Download content for learning anywhere, anytime!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              isOnline ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
              <span className="font-comic text-sm">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            <Button 
              variant="secondary" 
              onClick={() => setIsOnline(!isOnline)}
              className="text-gray-800"
            >
              Toggle Connection
            </Button>
          </div>
        </div>
      </Card>

      {/* Storage Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center gap-3">
            <HardDrive className="w-8 h-8 text-blue-500" />
            <div>
              <div className="font-fredoka font-bold text-2xl text-gray-800">{downloadedPacks.length}</div>
              <div className="font-comic text-sm text-gray-600">Downloaded</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center gap-3">
            <Download className="w-8 h-8 text-green-500" />
            <div>
              <div className="font-fredoka font-bold text-2xl text-gray-800">{totalDownloadedSize}MB</div>
              <div className="font-comic text-sm text-gray-600">Storage Used</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-8 h-8 text-purple-500" />
            <div>
              <div className="font-fredoka font-bold text-2xl text-gray-800">{downloadingPacks.length}</div>
              <div className="font-comic text-sm text-gray-600">Downloading</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-yellow-500" />
            <div>
              <div className="font-fredoka font-bold text-2xl text-gray-800">{learningPacks.length}</div>
              <div className="font-comic text-sm text-gray-600">Total Packs</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Offline Mode Alert */}
      {!isOnline && (
        <Card className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-orange-500" />
            <div>
              <div className="font-fredoka font-bold text-lg text-gray-800">📴 Offline Mode Active</div>
              <div className="font-comic text-sm text-gray-600">
                You can only access downloaded content. Connect to internet to download new packs.
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Active Downloads */}
      {downloadingPacks.length > 0 && (
        <Card className="p-4">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-500" />
            📥 Active Downloads
          </h3>
          <div className="space-y-3">
            {downloadingPacks.map((pack) => (
              <div key={pack.id} className="bg-blue-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-fredoka font-bold text-sm">{pack.title}</span>
                  <span className="font-comic text-xs text-gray-600">
                    {Math.round(pack.downloadProgress || 0)}%
                  </span>
                </div>
                <Progress value={pack.downloadProgress || 0} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category === 'all' ? '🌟 All' : (
              <span className="flex items-center gap-1">
                {getCategoryIcon(category)}
                {category}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Learning Packs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPacks.map((pack) => (
          <Card 
            key={pack.id} 
            className={`overflow-hidden transition-all duration-300 ${
              pack.isDownloaded ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 
              !isOnline && !pack.isDownloaded ? 'opacity-50' : 'hover:shadow-lg'
            }`}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(pack.category)}
                  <Badge variant="secondary" className="capitalize">
                    {pack.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <HardDrive className="w-4 h-4 text-gray-500" />
                  <span className="font-comic text-sm text-gray-600">{pack.size}MB</span>
                </div>
              </div>

              <h4 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                {pack.title}
                {pack.isDownloaded && <CheckCircle className="w-5 h-5 text-green-500 inline ml-2" />}
              </h4>

              <p className="font-comic text-sm text-gray-600 mb-3">
                {pack.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="font-comic text-gray-600">Activities:</span>
                  <span className="font-bold">{pack.activities}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-comic text-gray-600">Duration:</span>
                  <span className="font-bold">{pack.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-comic text-gray-600">Age Group:</span>
                  <span className="font-bold">{pack.ageGroup}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <Badge className={getDifficultyColor(pack.difficulty)}>
                  {pack.difficulty}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-comic text-sm">{pack.rating}</span>
                </div>
              </div>

              {pack.isDownloading ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-comic text-blue-600">Downloading...</span>
                    <span className="font-bold text-blue-600">
                      {Math.round(pack.downloadProgress || 0)}%
                    </span>
                  </div>
                  <Progress value={pack.downloadProgress || 0} className="h-2" />
                </div>
              ) : pack.isDownloaded ? (
                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-500 hover:bg-green-600">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Open Pack
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(pack.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  className="w-full"
                  onClick={() => handleDownload(pack.id)}
                  disabled={!isOnline}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {!isOnline ? 'Offline - Cannot Download' : 'Download Pack'}
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Storage Management */}
      <Card className="p-4 bg-gradient-to-r from-gray-50 to-slate-50">
        <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-gray-500" />
          💾 Storage Management
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-3 border">
            <div className="font-comic font-bold text-sm text-gray-800 mb-1">Smart Downloads</div>
            <div className="font-comic text-xs text-gray-600">
              Automatically download based on your child's interests
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border">
            <div className="font-comic font-bold text-sm text-gray-800 mb-1">Auto-Cleanup</div>
            <div className="font-comic text-xs text-gray-600">
              Remove old content to free up space
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border">
            <div className="font-comic font-bold text-sm text-gray-800 mb-1">Download Schedule</div>
            <div className="font-comic text-xs text-gray-600">
              Set preferred times for automatic downloads
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OfflineLearningPacks;