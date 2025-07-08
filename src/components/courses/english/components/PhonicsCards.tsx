
import { Card } from '@/components/ui/card';

interface PhonicsWord {
  word: string;
  sounds: string[];
  emoji: string;
  color: string;
}

interface PhonicsCardsProps {
  words: PhonicsWord[];
}

const PhonicsCards = ({ words }: PhonicsCardsProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {words.map((item, index) => (
        <Card 
          key={item.word} 
          className={`p-6 text-center ${item.color} hover:shadow-lg transition-all duration-300 animate-fade-in`} 
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="text-6xl mb-4 animate-bounce">
            {item.emoji}
          </div>
          <div className="font-fredoka text-2xl font-bold text-gray-800 mb-2">
            {item.word}
          </div>
          <div className="font-comic text-lg text-gray-600">
            {item.sounds[0]}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PhonicsCards;
