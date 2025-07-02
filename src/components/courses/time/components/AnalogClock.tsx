
import { useEffect, useState } from 'react';

interface AnalogClockProps {
  time: Date;
  size?: 'small' | 'medium' | 'large';
  showNumbers?: boolean;
  interactive?: boolean;
}

const AnalogClock = ({ time, size = 'medium', showNumbers = true, interactive = false }: AnalogClockProps) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  
  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64'
  };

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

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

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full bg-white border-4 border-blue-300 rounded-full shadow-lg"
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
              strokeWidth="2"
            />
          );
        })}

        {/* Numbers */}
        {showNumbers && clockNumbers.map(({ number, x, y }) => (
          <text
            key={number}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-700 text-sm font-bold font-fredoka"
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
          stroke="#1F2937"
          strokeWidth="3"
          strokeLinecap="round"
          className={interactive ? 'cursor-pointer hover:stroke-blue-600' : ''}
          onMouseEnter={() => interactive && setHoveredPart('hour')}
          onMouseLeave={() => interactive && setHoveredPart(null)}
        />

        {/* Minute hand */}
        <line
          x1="50"
          y1="50"
          x2={50 + 35 * Math.cos(minuteAngle * Math.PI / 180)}
          y2={50 + 35 * Math.sin(minuteAngle * Math.PI / 180)}
          stroke="#374151"
          strokeWidth="2"
          strokeLinecap="round"
          className={interactive ? 'cursor-pointer hover:stroke-green-600' : ''}
          onMouseEnter={() => interactive && setHoveredPart('minute')}
          onMouseLeave={() => interactive && setHoveredPart(null)}
        />

        {/* Second hand */}
        <line
          x1="50"
          y1="50"
          x2={50 + 38 * Math.cos(secondAngle * Math.PI / 180)}
          y2={50 + 38 * Math.sin(secondAngle * Math.PI / 180)}
          stroke="#EF4444"
          strokeWidth="1"
          strokeLinecap="round"
          className={interactive ? 'cursor-pointer hover:stroke-red-600' : ''}
          onMouseEnter={() => interactive && setHoveredPart('second')}
          onMouseLeave={() => interactive && setHoveredPart(null)}
        />

        {/* Center dot */}
        <circle cx="50" cy="50" r="2" fill="#1F2937" />
      </svg>

      {/* Interactive tooltips */}
      {interactive && hoveredPart && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-comic">
          {hoveredPart === 'hour' && `Hour: ${hours === 0 ? 12 : hours}`}
          {hoveredPart === 'minute' && `Minutes: ${minutes}`}
          {hoveredPart === 'second' && `Seconds: ${seconds}`}
        </div>
      )}
    </div>
  );
};

export default AnalogClock;
