
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Palette, Sparkles } from 'lucide-react';

const MagicPaintbook = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-fredoka font-bold text-2xl text-gray-800 mb-3">
          🎨 Magic Paint Studio
        </h3>
        <p className="font-comic text-gray-600 mb-6 max-w-2xl mx-auto">
          Create amazing digital artworks with magical brushes, effects, and creative tools!
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="mb-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-6 text-center">
            <Palette className="w-12 h-12 text-purple-500 mx-auto mb-2" />
            <h4 className="font-fredoka font-bold text-lg text-gray-800">Creative Canvas</h4>
            <p className="font-comic text-sm text-gray-600 mb-4">
              Express yourself with a full digital canvas and amazing brush effects
            </p>
            <Button 
              className="gradient-purple text-white font-comic font-bold rounded-full"
              onClick={() => navigate('/activities/magic-paint-studio')}
            >
              Start Drawing
            </Button>
          </div>
          
          <h5 className="font-comic font-bold text-gray-700 mb-2">Features:</h5>
          <ul className="space-y-1 font-comic text-sm text-gray-600 mb-4">
            <li>• Full-color digital canvas</li>
            <li>• Multiple brush types and effects</li>
            <li>• Custom color picker</li>
            <li>• Save your creations</li>
            <li>• Earn stars for each artwork</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl p-4 text-center">
              <div className="text-4xl mb-1">✨</div>
              <h5 className="font-comic font-bold text-gray-700">Sparkle Brush</h5>
              <p className="font-comic text-xs text-gray-600">
                Add magical sparkles to your art
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-4 text-center">
              <div className="text-4xl mb-1">🌈</div>
              <h5 className="font-comic font-bold text-gray-700">Rainbow Mode</h5>
              <p className="font-comic text-xs text-gray-600">
                Create colorful rainbow effects
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-xl p-4 text-center">
              <div className="text-4xl mb-1">📱</div>
              <h5 className="font-comic font-bold text-gray-700">Touch Support</h5>
              <p className="font-comic text-xs text-gray-600">
                Works on tablets and phones
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 text-center">
              <div className="text-4xl mb-1">💾</div>
              <h5 className="font-comic font-bold text-gray-700">Save & Share</h5>
              <p className="font-comic text-xs text-gray-600">
                Download your masterpieces
              </p>
            </div>
          </div>
          
          <Button 
            className="w-full gradient-blue text-white font-comic font-bold rounded-full gap-2"
            onClick={() => navigate('/activities/magic-paint-studio')}
          >
            <Sparkles className="w-4 h-4" />
            Open Magic Paint Studio
          </Button>
        </div>
      </div>
      
      <div className="text-center">
        <Button 
          className="gradient-purple text-white font-comic font-bold px-8 py-3 rounded-full"
          onClick={() => navigate('/activities/magic-paint-studio')}
        >
          <Palette className="w-5 h-5 mr-2" />
          Start Creating
        </Button>
      </div>
    </div>
  );
};

export default MagicPaintbook;
