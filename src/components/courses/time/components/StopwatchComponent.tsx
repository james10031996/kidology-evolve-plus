
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StopwatchComponent = () => {
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime(prev => prev + 1);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isStopwatchRunning]);

  const formatStopwatchTime = (centiseconds: number) => {
    const totalSeconds = Math.floor(centiseconds / 100);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const cs = centiseconds % 100;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  return (
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
  );
};

export default StopwatchComponent;
