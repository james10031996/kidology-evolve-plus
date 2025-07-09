
interface ClockFaceProps {
  showNumbers: boolean;
  theme: any;
  currentTime: Date;
  showSeconds: boolean;
  interactive: boolean;
  onHover: (part: string | null) => void;
}

const ClockFace = ({ showNumbers, theme, currentTime, showSeconds, interactive, onHover }: ClockFaceProps) => {
  const hours = currentTime.getHours() % 12;
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

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
    <svg viewBox="0 0 100 100" className={`w-full h-full ${theme.face} rounded-full shadow-lg transition-all duration-300`}>
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
        if (i % 5 !== 0) {
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
          className={`${theme.numbers} text-sm font-bold font-fredoka`}
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
        stroke={theme.hourHand}
        strokeWidth="4"
        strokeLinecap="round"
        className={interactive ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''}
        onMouseEnter={() => interactive && onHover('hour')}
        onMouseLeave={() => interactive && onHover(null)}
      />

      {/* Minute hand */}
      <line
        x1="50"
        y1="50"
        x2={50 + 35 * Math.cos(minuteAngle * Math.PI / 180)}
        y2={50 + 35 * Math.sin(minuteAngle * Math.PI / 180)}
        stroke={theme.minuteHand}
        strokeWidth="3"
        strokeLinecap="round"
        className={interactive ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''}
        onMouseEnter={() => interactive && onHover('minute')}
        onMouseLeave={() => interactive && onHover(null)}
      />

      {/* Second hand */}
      {showSeconds && (
        <line
          x1="50"
          y1="50"
          x2={50 + 38 * Math.cos(secondAngle * Math.PI / 180)}
          y2={50 + 38 * Math.sin(secondAngle * Math.PI / 180)}
          stroke={theme.secondHand}
          strokeWidth="1.5"
          strokeLinecap="round"
          className={interactive ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''}
          onMouseEnter={() => interactive && onHover('second')}
          onMouseLeave={() => interactive && onHover(null)}
        />
      )}

      {/* Center dot */}
      <circle cx="50" cy="50" r="3" fill={theme.hourHand} />
      <circle cx="50" cy="50" r="1.5" fill="white" />
    </svg>
  );
};

export default ClockFace;
