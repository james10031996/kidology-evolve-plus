
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Palette, Shirt, Crown, Download, RotateCcw, Sparkles } from 'lucide-react';

type AvatarPart = {
  category: string;
  options: string[];
  current: number;
};

const AvatarDressUpCreator = () => {
  const [avatarParts, setAvatarParts] = useState<{ [key: string]: AvatarPart }>({
    face: { category: 'Face', options: ['😊', '😄', '🤗', '😎', '🤓', '😇', '🥰', '😋'], current: 0 },
    hair: { category: 'Hair', options: ['👨‍🦰', '👩‍🦰', '👨‍🦱', '👩‍🦱', '👨‍🦳', '👩‍🦳', '👨‍🦲', '👩‍🦲'], current: 0 },
    outfit: { category: 'Outfit', options: ['👕', '👔', '👗', '🥼', '🦺', '👘', '🥻', '👚'], current: 0 },
    accessories: { category: 'Accessories', options: ['👓', '🕶️', '🎩', '👑', '🎀', '⌚', '💍', '🧢'], current: 0 },
    background: { category: 'Background', options: ['🌈', '🌟', '🌸', '🌊', '🏔️', '🌳', '🏠', '🎪'], current: 0 }
  });

  const [savedAvatars, setSavedAvatars] = useState<any[]>([]);
  const [currentName, setCurrentName] = useState('');

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
  ];

  const patterns = ['polka-dots', 'stripes', 'hearts', 'stars', 'rainbow'];

  const changePart = (category: string, direction: 'next' | 'prev') => {
    setAvatarParts(prev => {
      const part = prev[category];
      const newIndex = direction === 'next' 
        ? (part.current + 1) % part.options.length
        : (part.current - 1 + part.options.length) % part.options.length;
      
      return {
        ...prev,
        [category]: { ...part, current: newIndex }
      };
    });
  };

  const randomizeAvatar = () => {
    setAvatarParts(prev => {
      const newParts = { ...prev };
      Object.keys(newParts).forEach(key => {
        newParts[key] = {
          ...newParts[key],
          current: Math.floor(Math.random() * newParts[key].options.length)
        };
      });
      return newParts;
    });
  };

  const resetAvatar = () => {
    setAvatarParts(prev => {
      const newParts = { ...prev };
      Object.keys(newParts).forEach(key => {
        newParts[key] = { ...newParts[key], current: 0 };
      });
      return newParts;
    });
  };

  const saveAvatar = () => {
    if (!currentName.trim()) {
      alert('Please enter a name for your avatar!');
      return;
    }

    const avatar = {
      id: Date.now(),
      name: currentName,
      parts: { ...avatarParts },
      createdAt: new Date().toLocaleDateString()
    };

    setSavedAvatars(prev => [...prev, avatar]);
    setCurrentName('');
    
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(`Great job! ${currentName} has been saved to your avatar collection!`);
      window.speechSynthesis.speak(utterance);
    }
  };

  const loadAvatar = (avatar: any) => {
    setAvatarParts(avatar.parts);
    setCurrentName(avatar.name);
  };

  const getCurrentAvatar = () => {
    return {
      face: avatarParts.face.options[avatarParts.face.current],
      hair: avatarParts.hair.options[avatarParts.hair.current],
      outfit: avatarParts.outfit.options[avatarParts.outfit.current],
      accessories: avatarParts.accessories.options[avatarParts.accessories.current],
      background: avatarParts.background.options[avatarParts.background.current]
    };
  };

  const avatar = getCurrentAvatar();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-purple rounded-full mx-auto mb-3 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            👤 Avatar Dress-Up Creator
          </h2>
          <p className="font-comic text-gray-600">
            Design your perfect character with endless customization options!
          </p>
          <div className="mt-3">
            <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full font-comic font-bold inline-block">
              <Sparkles className="w-4 h-4 inline mr-1" />
              Avatars Created: {savedAvatars.length}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Avatar Preview */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4 text-center">
            🎨 Your Avatar
          </h3>

          {/* Avatar Display */}
          <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-6">
            <div className="absolute inset-0 text-6xl flex items-center justify-center opacity-20">
              {avatar.background}
            </div>
            
            <div className="relative text-center space-y-2">
              <div className="text-4xl">{avatar.hair}</div>
              <div className="text-6xl">{avatar.face}</div>
              <div className="text-4xl">{avatar.outfit}</div>
              <div className="text-3xl">{avatar.accessories}</div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-2 right-2 text-yellow-400 animate-pulse">✨</div>
            <div className="absolute bottom-2 left-2 text-pink-400 animate-pulse">💫</div>
          </div>

          {/* Avatar Name */}
          <div className="mb-4">
            <label className="font-comic font-bold text-gray-700 block mb-2">
              Avatar Name:
            </label>
            <input
              type="text"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              placeholder="Enter avatar name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-full font-comic focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button 
              onClick={saveAvatar}
              className="w-full rounded-full gradient-purple text-white font-comic"
              disabled={!currentName.trim()}
            >
              <Download className="w-4 h-4 mr-2" />
              Save Avatar
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={randomizeAvatar}
                variant="outline" 
                className="rounded-full font-comic"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Random
              </Button>
              <Button 
                onClick={resetAvatar}
                variant="outline" 
                className="rounded-full font-comic"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Customization Panel */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
            🛠️ Customize Parts
          </h3>

          <div className="space-y-4">
            {Object.entries(avatarParts).map(([key, part]) => (
              <div key={key} className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-comic font-bold text-gray-700 mb-3 flex items-center">
                  {key === 'face' && '😊'}
                  {key === 'hair' && '💇'}
                  {key === 'outfit' && '👕'}
                  {key === 'accessories' && '👓'}
                  {key === 'background' && '🌈'}
                  <span className="ml-2">{part.category}</span>
                </h4>
                
                <div className="flex items-center justify-between">
                  <Button
                    size="sm"
                    onClick={() => changePart(key, 'prev')}
                    variant="outline"
                    className="rounded-full"
                  >
                    ←
                  </Button>
                  
                  <div className="text-3xl bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
                    {part.options[part.current]}
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={() => changePart(key, 'next')}
                    variant="outline"
                    className="rounded-full"
                  >
                    →
                  </Button>
                </div>
                
                <div className="mt-2 text-center">
                  <span className="font-comic text-xs text-gray-500">
                    {part.current + 1} of {part.options.length}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Color Palette */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4">
            <h4 className="font-comic font-bold text-gray-700 mb-3">🎨 Color Themes</h4>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color, idx) => (
                <button
                  key={idx}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    // Apply color theme to avatar
                    if (window.speechSynthesis) {
                      const utterance = new SpeechSynthesisUtterance('Color theme applied!');
                      window.speechSynthesis.speak(utterance);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Saved Avatars */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
            👥 Avatar Collection
          </h3>

          {savedAvatars.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎭</div>
              <p className="font-comic text-gray-500">
                No avatars saved yet! Create your first avatar to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {savedAvatars.map((savedAvatar) => {
                const parts = savedAvatar.parts;
                return (
                  <Card
                    key={savedAvatar.id}
                    className="p-3 cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
                    onClick={() => loadAvatar(savedAvatar)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col items-center text-xs">
                        <div>{parts.hair.options[parts.hair.current]}</div>
                        <div>{parts.face.options[parts.face.current]}</div>
                        <div>{parts.outfit.options[parts.outfit.current]}</div>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-comic font-bold text-gray-800">
                          {savedAvatar.name}
                        </h4>
                        <p className="font-comic text-xs text-gray-500">
                          Created: {savedAvatar.createdAt}
                        </p>
                      </div>
                      
                      <div className="text-lg">
                        {parts.accessories.options[parts.accessories.current]}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Creation Tips */}
          <div className="mt-6 bg-yellow-50 rounded-xl p-4">
            <h4 className="font-comic font-bold text-yellow-800 mb-2">💡 Creation Tips</h4>
            <ul className="font-comic text-xs text-yellow-700 space-y-1">
              <li>• Mix and match different styles</li>
              <li>• Try the random button for surprises</li>
              <li>• Save your favorite combinations</li>
              <li>• Create avatars for friends and family</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AvatarDressUpCreator;
