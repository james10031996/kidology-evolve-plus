
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Play, Pause, Square, Volume2, Download } from 'lucide-react';

interface MusicMakerToolProps {
  onClose: () => void;
}

const MusicMakerTool = ({ onClose }: MusicMakerToolProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState('🎹');
  const [recordedNotes, setRecordedNotes] = useState<string[]>([]);

  const instruments = [
    { emoji: '🎹', name: 'Piano', sound: 'piano' },
    { emoji: '🥁', name: 'Drums', sound: 'drums' },
    { emoji: '🎸', name: 'Guitar', sound: 'guitar' },
    { emoji: '🎺', name: 'Trumpet', sound: 'trumpet' },
    { emoji: '🎻', name: 'Violin', sound: 'violin' },
    { emoji: '🪘', name: 'Drum', sound: 'drum' }
  ];

  const notes = [
    { note: 'Do', color: 'bg-red-200 hover:bg-red-300', sound: 'C' },
    { note: 'Re', color: 'bg-orange-200 hover:bg-orange-300', sound: 'D' },
    { note: 'Mi', color: 'bg-yellow-200 hover:bg-yellow-300', sound: 'E' },
    { note: 'Fa', color: 'bg-green-200 hover:bg-green-300', sound: 'F' },
    { note: 'Sol', color: 'bg-blue-200 hover:bg-blue-300', sound: 'G' },
    { note: 'La', color: 'bg-indigo-200 hover:bg-indigo-300', sound: 'A' },
    { note: 'Ti', color: 'bg-purple-200 hover:bg-purple-300', sound: 'B' }
  ];

  const playNote = (note: string, sound: string) => {
    setRecordedNotes([...recordedNotes, `${selectedInstrument} ${note}`]);
    console.log(`Playing ${sound} on ${selectedInstrument}`);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const clearRecording = () => {
    setRecordedNotes([]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-fredoka text-3xl text-blue-700 mb-2">🎵 Music Maker Studio</h3>
        <p className="font-comic text-gray-600">Create beautiful music with virtual instruments!</p>
      </div>
      
      {/* Instrument Selection */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
        <h4 className="font-fredoka text-xl text-blue-800 mb-4 text-center">Choose Your Instrument</h4>
        <div className="flex justify-center space-x-4 mb-6">
          {instruments.map((instrument, index) => (
            <button
              key={index}
              className={`text-5xl hover:scale-110 transition-all duration-200 p-3 rounded-xl ${
                selectedInstrument === instrument.emoji 
                  ? 'bg-white shadow-lg scale-110' 
                  : 'hover:bg-white/50'
              }`}
              onClick={() => setSelectedInstrument(instrument.emoji)}
              title={instrument.name}
            >
              {instrument.emoji}
            </button>
          ))}
        </div>
        <p className="text-center font-comic text-gray-600">
          Selected: {instruments.find(i => i.emoji === selectedInstrument)?.name}
        </p>
      </Card>
      
      {/* Piano Keys */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <h4 className="font-fredoka text-xl text-purple-800 mb-4 text-center">Musical Notes</h4>
        <div className="grid grid-cols-7 gap-2 mb-6">
          {notes.map((noteObj, index) => (
            <button
              key={index}
              className={`${noteObj.color} p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 border-white`}
              onClick={() => playNote(noteObj.note, noteObj.sound)}
            >
              <div className="font-fredoka text-lg text-gray-700 font-bold">
                {noteObj.note}
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Recording Controls */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-teal-50">
        <h4 className="font-fredoka text-xl text-green-800 mb-4 text-center">Recording Studio</h4>
        
        <div className="flex justify-center space-x-4 mb-4">
          <Button
            onClick={togglePlayback}
            className={`font-comic ${isPlaying ? 'gradient-red' : 'gradient-green'} text-white`}
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? 'Pause' : 'Play Recording'}
          </Button>
          <Button
            onClick={clearRecording}
            variant="outline"
            className="font-comic border-red-300 hover:bg-red-50"
          >
            <Square className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Button
            variant="outline"
            className="font-comic border-blue-300 hover:bg-blue-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Save Song
          </Button>
        </div>

        {/* Recorded Notes Display */}
        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 min-h-20">
          <p className="font-comic text-gray-600 text-sm mb-2">Your Composition:</p>
          <div className="flex flex-wrap gap-1">
            {recordedNotes.length === 0 ? (
              <p className="font-comic text-gray-400 italic">Start playing notes to record your song!</p>
            ) : (
              recordedNotes.map((note, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-comic"
                >
                  {note}
                </span>
              ))
            )}
          </div>
        </div>
      </Card>

      {/* Additional Features */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 text-center">
          <Volume2 className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <h5 className="font-fredoka font-bold text-gray-800">Sound Effects</h5>
          <p className="font-comic text-sm text-gray-600 mb-3">Add fun sound effects to your music</p>
          <Button size="sm" className="gradient-orange text-white font-comic">
            Explore Sounds
          </Button>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 text-center">
          <Music className="w-8 h-8 text-pink-500 mx-auto mb-2" />
          <h5 className="font-fredoka font-bold text-gray-800">Song Templates</h5>
          <p className="font-comic text-sm text-gray-600 mb-3">Use pre-made melodies as starting points</p>
          <Button size="sm" className="gradient-pink text-white font-comic">
            Browse Templates
          </Button>
        </Card>
      </div>

      <div className="text-center">
        <Button variant="outline" className="font-comic" onClick={onClose}>
          Back to Creative Studio
        </Button>
      </div>
    </div>
  );
};

export default MusicMakerTool;
