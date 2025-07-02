
import { useState } from 'react';

interface DigitalClockProps {
  time: Date;
  format?: '12' | '24';
  showSeconds?: boolean;
  interactive?: boolean;
}

const DigitalClock = ({ time, format = '12', showSeconds = true, interactive = false }: DigitalClockProps) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const formatTime = () => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    let ampm = '';

    if (format === '12') {
      ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      if (hours === 0) hours = 12;
    }

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return {
      hours: formatNumber(hours),
      minutes: formatNumber(minutes),
      seconds: formatNumber(seconds),
      ampm
    };
  };

  const { hours, minutes, seconds, ampm } = formatTime();

  return (
    <div className="relative">
      <div className="bg-gray-900 text-green-400 font-mono text-4xl px-6 py-4 rounded-lg shadow-lg border-2 border-green-500">
        <div className="flex items-center justify-center space-x-2">
          <span 
            className={interactive ? 'cursor-pointer hover:bg-green-500 hover:text-gray-900 px-1 rounded transition-colors' : ''}
            onMouseEnter={() => interactive && setHoveredPart('hours')}
            onMouseLeave={() => interactive && setHoveredPart(null)}
          >
            {hours}
          </span>
          <span className="animate-pulse">:</span>
          <span 
            className={interactive ? 'cursor-pointer hover:bg-green-500 hover:text-gray-900 px-1 rounded transition-colors' : ''}
            onMouseEnter={() => interactive && setHoveredPart('minutes')}
            onMouseLeave={() => interactive && setHoveredPart(null)}
          >
            {minutes}
          </span>
          {showSeconds && (
            <>
              <span className="animate-pulse">:</span>
              <span 
                className={interactive ? 'cursor-pointer hover:bg-green-500 hover:text-gray-900 px-1 rounded transition-colors' : ''}
                onMouseEnter={() => interactive && setHoveredPart('seconds')}
                onMouseLeave={() => interactive && setHoveredPart(null)}
              >
                {seconds}
              </span>
            </>
          )}
          {format === '12' && (
            <span 
              className={`text-lg ml-2 ${interactive ? 'cursor-pointer hover:bg-green-500 hover:text-gray-900 px-1 rounded transition-colors' : ''}`}
              onMouseEnter={() => interactive && setHoveredPart('ampm')}
              onMouseLeave={() => interactive && setHoveredPart(null)}
            >
              {ampm}
            </span>
          )}
        </div>
      </div>

      {/* Interactive tooltips */}
      {interactive && hoveredPart && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-comic whitespace-nowrap">
          {hoveredPart === 'hours' && `Hours: ${hours} (${format === '12' ? '12-hour format' : '24-hour format'})`}
          {hoveredPart === 'minutes' && `Minutes: ${minutes} (0-59)`}
          {hoveredPart === 'seconds' && `Seconds: ${seconds} (0-59)`}
          {hoveredPart === 'ampm' && `${ampm}: ${ampm === 'AM' ? 'Morning' : 'Afternoon/Evening'}`}
        </div>
      )}
    </div>
  );
};

export default DigitalClock;
