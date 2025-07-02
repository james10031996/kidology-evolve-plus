
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime(prev => prev + 1);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isStopwatchRunning]);

  const hours = currentTime.getHours() % 12;
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  // Calculate angles for hands
  const hourAngle = (hours * 30) + (minutes * 0.5) - 90;
  const minuteAngle = (minutes * 6) - 90;
  const secondAngle = (seconds * 6) - 90;

  const clockNumbers = Array.from({ length: 12 }, (_, i) => {
    const number = i === 0 ? 12 : i;
    const angle = (i * 30) - 90;
    const x = 50 + 35 * Math.cos(angle * Math.PI / 180);
    const y = 50 + 35 * Math.sin(angle * Math.PI / 180);
    return { number, x, y };
  });

  const formatStopwatchTime = (centiseconds: number) => {
    const totalSeconds = Math.floor(centiseconds / 100);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const cs = centiseconds % 100;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className="space-y-4">
      {/* Main Clock */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg 
          viewBox="0 0 100 100" 
          className={`w-full h-full ${currentTheme.face} rounded-full shadow-lg transition-all duration-300 ${isAlarmRinging ? 'animate-pulse' : ''}`}
        >
          {/* Clock face */}
          <circle cx="50" cy="50" r="48" fill="white" stroke="#3B82F6" strokeWidth="2" />
          
          {/* Hour markers */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30) - 90;
            const x1 = 50 + 40 * Math.cos(angle * Math.PI / 180);
            const y1 = 50 + 40 * Math.sin(angle * Math.PI / 180);
            const x2 = 50 + 44 * Math.cos(angle * Math.PI / 180);
            const y2 = 50 + 44 * Math.sin(angle * Math.PI / 180);
            
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#374151"
                strokeWidth={i % 3 === 0 ? "3" : "2"}
              />
            );
          })}

          {/* Minute markers */}
          {Array.from({ length: 60 }, (_, i) => {
            if (i % 5 !== 0) { // Skip hour markers
              const angle = (i * 6) - 90;
              const x1 = 50 + 42 * Math.cos(angle * Math.PI / 180);
              const y1 = 50 + 42 * Math.sin(angle * Math.PI / 180);
              const x2 = 50 + 44 * Math.cos(angle * Math.PI / 180);
              const y2 = 50 + 44 * Math.sin(angle * Math.PI / 180);
              
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#9CA3AF"
                  strokeWidth="0.5"
                />
              );
            }
            return null;
          })}

          {/* Numbers */}
          {showNumbers && clockNumbers.map(({ number, x, y }) => (
            <text
              key={number}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`${currentTheme.numbers} text-sm font-bold font-fredoka`}
              fontSize="6"
            >
              {number}
            </text>
          ))}

          {/* Hour hand */}
          <line
            x1="50"
            y1="50"
            x2={50 + 25 * Math.cos(hourAngle * Math.PI / 180)}
            y2={50 + 25 * Math.sin(hourAngle * Math.PI / 180)}
            stroke={currentTheme.hourHand}
            strokeWidth="4"
            strokeLinecap="round"
            className={interactive ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''}
            onMouseEnter={() => interactive && setHoveredPart('hour')}
            onMouseLeave={() => interactive && setHoveredPart(null)}
          />

          {/* Minute hand */}
          <line
            x1="50"
            y1="50"
            x2={50 + 35 * Math.cos(minuteAngle * Math.PI / 180)}
            y2={50 + 35 * Math.sin(minuteAngle * Math.PI / 180)}
            stroke={currentTheme.minuteHand}
            strokeWidth="3"
            strokeLinecap="round"
            className={interactive ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''}
            onMouseEnter={() => interactive && setHoveredPart('minute')}
            onMouseLeave={() => interactive && setHoveredPart(null)}
          />

          {/* Second hand */}
          {showSecondsState && (
            <line
              x1="50"
              y1="50"
              x2={50 + 38 * Math.cos(secondAngle * Math.PI / 180)}
              y2={50 + 38 * Math.sin(secondAngle * Math.PI / 180)}
              stroke={currentTheme.secondHand}
              strokeWidth="1.5"
              strokeLinecap="round"
              className={interactive ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''}
              onMouseEnter={() => interactive && setHoveredPart('second')}
              onMouseLeave={() => interactive && setHoveredPart(null)}
            />
          )}

          {/* Center dot */}
          <circle cx="50" cy="50" r="3" fill={currentTheme.hourHand} />
          <circle cx="50" cy="50" r="1.5" fill="white" />
        </svg>

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
      {showStopwatch && (
        <Card className="p-4 bg-blue-50">
          <h4 className="font-fredoka font-bold text-center mb-3">⏱️ Stopwatch</h4>
          <div className="text-center">
            <div className="text-2xl font-mono mb-3 text-blue-700">
              {formatStopwatchTime(stopwatchTime)}
            </div>
            <div className="flex gap-2 justify-center">
              <Button
                size="sm"
                onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
                className={isStopwatchRunning ? 'gradient-orange' : 'gradient-green'}
              >
                {isStopwatchRunning ? 'Stop' : 'Start'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setStopwatchTime(0);
                  setIsStopwatchRunning(false);
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>
      )}

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
