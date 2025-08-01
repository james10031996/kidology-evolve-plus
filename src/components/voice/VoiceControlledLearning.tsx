import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';

const VoiceControlledLearning = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <Mic className="w-8 h-8" />
          <div>
            <h2 className="font-fredoka font-bold text-2xl">🎤 Voice Learning Assistant</h2>
            <p className="font-comic text-lg opacity-90">Learn hands-free with voice commands!</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <Button 
              className={`w-full h-16 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-white/30'}`}
              onClick={() => setIsListening(!isListening)}
            >
              {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </Button>
            <div className="text-sm mt-2">{isListening ? 'Listening...' : 'Start Voice'}</div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <Button 
              className="w-full h-16 rounded-full bg-white/30"
              onClick={() => setIsSpeaking(!isSpeaking)}
            >
              {isSpeaking ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
            </Button>
            <div className="text-sm mt-2">Voice Output</div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <Button className="w-full h-16 rounded-full bg-white/30">
              <Play className="w-8 h-8" />
            </Button>
            <div className="text-sm mt-2">Play Lesson</div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <Button className="w-full h-16 rounded-full bg-white/30">
              <RotateCcw className="w-8 h-8" />
            </Button>
            <div className="text-sm mt-2">Repeat</div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-fredoka font-bold text-lg mb-3">🗣️ Voice Commands</h3>
          <div className="space-y-2">
            {['Start math lesson', 'Read story aloud', 'Play learning game', 'Show my progress'].map((cmd, i) => (
              <Badge key={i} variant="outline" className="block w-full p-2 text-left">
                "{cmd}"
              </Badge>
            ))}
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-fredoka font-bold text-lg mb-3">🎯 Current Session</h3>
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="font-comic text-sm">Ready to start voice-controlled learning!</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VoiceControlledLearning;