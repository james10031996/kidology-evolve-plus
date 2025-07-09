
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ClockFace from './ClockFace';
import StopwatchComponent from './StopwatchComponent';

interface AnalogClockProps {
  time: Date;
  size?: 'small' | 'medium' | 'large';
  showNumbers?: boolean;
  interactive?: boolean;
  theme?: 'classic' | 'modern' | 'colorful' | 'digital';
  showSeconds?: boolean;
  timezone?: string;
  alarmTime?: string;
}

const AnalogClock = ({ 
  time, 
  size = 'medium', 
  showNumbers = true, 
  interactive = false,
  theme = 'classic',
  showSeconds = true,
  timezone,
  alarmTime
}: AnalogClockProps) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(time);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);
  const [timeFormat, setTimeFormat] = useState<'12' | '24'>('12');
  const [showStopwatch, setShowStopwatch] = useState(false);
  const [showSecondsState, setShowSecondsState] = useState(showSeconds);
  
  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64'
  };

  const themeStyles = {
    classic: {
      face: 'bg-white border-4 border-blue-300',
      hourHand: '#1F2937',
      minuteHand: '#374151',
      secondHand: '#EF4444',
      numbers: 'fill-gray-700'
    },
    modern: {
      face: 'bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-400',
      hourHand: '#000000',
      minuteHand: '#333333',
      secondHand: '#FF6B6B',
      numbers: 'fill-gray-800'
    },
    colorful: {
      face: 'bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-300',
      hourHand: '#7C3AED',
      minuteHand: '#EC4899',
      secondHand: '#F59E0B',
      numbers: 'fill-purple-700'
    },
    digital: {
      face: 'bg-gray-900 border-2 border-green-400',
      hourHand: '#00FF00',
      minuteHand: '#00FF00',
      secondHand: '#FFFF00',
      numbers: 'fill-green-400'
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timezone) {
        const now = new Date().toLocaleString("en-US", {timeZone: timezone});
        setCurrentTime(new Date(now));
      } else {
        setCurrentTime(new Date());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  useEffect(() => {
    if (alarmTime) {
      const [hours, minutes] = alarmTime.split(':').map(Number);
      const now = currentTime;
      if (now.getHours() === hours && now.getMinutes() === minutes && now.getSeconds() === 0) {
        setIsAlarmRinging(true);
        setTimeout(() => setIsAlarmRinging(false), 5000);
      }
    }
  }, [currentTime, alarmTime]);

  const currentTheme = themeStyles[theme];
  const hours = currentTime.getHours() % 12;
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  return (
    <div className="space-y-4">
      {/* Main Clock */}
      <div className={`${sizeClasses[size]} relative`}>
        <ClockFace 
          showNumbers={showNumbers}
          theme={currentTheme}
          currentTime={currentTime}
          showSeconds={showSecondsState}
          interactive={interactive}
          onHover={setHoveredPart}
        />

        {/* Interactive tooltips */}
        {interactive && hoveredPart && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-comic animate-fade-in">
            {hoveredPart === 'hour' && `Hour: ${hours === 0 ? 12 : hours}`}
            {hoveredPart === 'minute' && `Minutes: ${minutes}`}
            {hoveredPart === 'second' && `Seconds: ${seconds}`}
          </div>
        )}

        {/* Alarm indicator */}
        {isAlarmRinging && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
            🔔 ALARM!
          </div>
        )}
      </div>

      {/* Digital Time Display */}
      <Card className="p-3 bg-gray-900 text-green-400 font-mono text-center">
        <div className="text-xl">
          {currentTime.toLocaleTimeString([], { 
            hour12: timeFormat === '12',
            hour: '2-digit',
            minute: '2-digit',
            second: showSecondsState ? '2-digit' : undefined
          })}
        </div>
        {timezone && (
          <div className="text-xs text-gray-500 mt-1">{timezone}</div>
        )}
      </Card>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setTimeFormat(timeFormat === '12' ? '24' : '12')}
          className="font-comic text-xs"
        >
          {timeFormat}H Format
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowSecondsState(!showSecondsState)}
          className="font-comic text-xs"
        >
          {showSecondsState ? 'Hide' : 'Show'} Seconds
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowStopwatch(!showStopwatch)}
          className="font-comic text-xs"
        >
          Stopwatch
        </Button>
      </div>

      {/* Stopwatch */}
      {showStopwatch && <StopwatchComponent />}

      {/* Time Facts */}
      <Card className="p-3 bg-gradient-to-r from-purple-50 to-pink-50">
        <h4 className="font-fredoka font-bold text-purple-700 text-sm mb-2">⏰ Time Facts</h4>
        <div className="text-xs font-comic space-y-1">
          <p>• Clock hands meet 22 times in 24 hours</p>
          <p>• Ancient sundials were the first clocks</p>
          <p>• Big Ben chimes every hour in London</p>
          <p>• Atomic clocks are the most accurate</p>
        </div>
      </Card>
    </div>
  );
};

export default AnalogClock;
