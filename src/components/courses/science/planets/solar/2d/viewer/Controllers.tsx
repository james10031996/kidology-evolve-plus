import { ArrowBigRight } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import texture from '../Data/texture.json';
import {Tooltip} from '@/components/ui/tooltip'; // adjust if your alias is '@ui'

// Replace with actual icon or your import
const PlayArrowIcon = () => <ArrowBigRight />;

interface Planet {
  name: string;
  texture: string;
}

interface ControllersProps {
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
  isNotMobile: boolean;
}

export default function Controllers({ setCurrent, current, isNotMobile }: ControllersProps) {
  const planets = texture.planets as Planet[];

  const handlePrev = () => {
    setCurrent(prev => (prev - 1 < 0 ? planets.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent(prev => (prev + 1 >= planets.length ? 0 : prev + 1));
  };

  return (
    <div className="absolute w-max sm:w-auto sm:bottom-6 bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1">
      <svg className={isNotMobile ? 'w-10 h-10' : 'w-10 h-12'}>
        <polygon points={isNotMobile ? '40,0 0,40 40,40' : '40,0 0,48 40,48'} fill="none" stroke="#335775" strokeWidth="1" />
      </svg>

      <Tooltip>
        <div onClick={handlePrev} className="sm:p-2 p-3 cursor-pointer border border-[#335775] backdrop-blur-md rounded-md">
          <button aria-label="Previous Planet" className="text-white hover:brightness-150">
            <ArrowBigRight className="rotate-180" />
          </button>
        </div>
      </Tooltip>

      <div className="flex items-center sm:min-w-auto gap-2 px-4 py-2 border border-[#335775] backdrop-blur-md rounded-md">
        {planets.map((p, index) => {
          const isCurrent = index === current;

          return (
            <div key={index} className={`${isCurrent ? 'flex' : 'hidden'} sm:flex sm:px-0 px-3 items-center gap-2.5`}>
              <Tooltip>
                {(isCurrent || isNotMobile) && (
                  <img
                    src={p.texture}
                    alt={p.name}
                    onClick={() => setCurrent(index)}
                    className="sm:w-7 sm:h-7 w-8.5 h-8.5 rounded-full object-cover cursor-pointer active:scale-[1.02] hover:scale-[1.1]"
                  />
                )}
              </Tooltip>
              <span className="text-lg font-medium text-white sm:hidden tracking-wide">{p.name}</span>
            </div>
          );
        })}
      </div>

      <Tooltip>
        <div onClick={handleNext} className="sm:p-2 p-3 cursor-pointer border border-[#335775] backdrop-blur-md rounded-md">
          <button aria-label="Next Planet" className="text-white hover:brightness-150">
            <PlayArrowIcon />
          </button>
        </div>
      </Tooltip>

      <svg className={isNotMobile ? 'w-10 h-10' : 'w-10 h-12'}>
        <polygon
          points={`0,0 40,${isNotMobile ? '40 0,40' : '48 0,48'}`}
          fill="none"
          stroke="#335775"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
