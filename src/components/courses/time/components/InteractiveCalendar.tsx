
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, MapPin, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface EventDetail {
  name: string;
  emoji: string;
  color: string;
  country: string;
  description: string;
  traditions: string[];
  funFacts: string[];
  duration: string;
  participants: string;
}

const InteractiveCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);
  const [showEventPopup, setShowEventPopup] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const worldwideEvents: Record<string, EventDetail> = {
    '2024-01-01': {
      name: 'New Year',
      emoji: '🎉',
      color: 'bg-purple-100',
      country: 'Worldwide',
      description: 'The celebration of the beginning of a new calendar year',
      traditions: ['Fireworks displays', 'Making resolutions', 'Midnight celebrations', 'Family gatherings'],
      funFacts: ['Times Square Ball Drop started in 1907', 'Sydney, Australia celebrates first', 'Some cultures use different calendars'],
      duration: '1 day',
      participants: 'Billions worldwide'
    },
    '2024-01-26': {
      name: 'Australia Day',
      emoji: '🇦🇺',
      color: 'bg-yellow-100',
      country: 'Australia',
      description: 'National day celebrating Australian culture and history',
      traditions: ['BBQ parties', 'Flag ceremonies', 'Citizenship ceremonies', 'Beach activities'],
      funFacts: ['Commemorates First Fleet arrival in 1788', 'Public holiday across Australia', 'Largest flag in the world displayed'],
      duration: '1 day',
      participants: '25 million Australians'
    },
    '2024-02-14': {
      name: 'Valentine\'s Day',
      emoji: '💝',
      color: 'bg-pink-100',
      country: 'Worldwide',
      description: 'Day of love and romance celebrated globally',
      traditions: ['Exchanging gifts', 'Romantic dinners', 'Love letters', 'Red roses'],
      funFacts: ['Named after Saint Valentine', '1 billion cards exchanged annually', 'Red roses symbolize love'],
      duration: '1 day',
      participants: 'Couples worldwide'
    },
    '2024-03-17': {
      name: 'St. Patrick\'s Day',
      emoji: '🍀',
      color: 'bg-green-100',
      country: 'Ireland & Worldwide',
      description: 'Irish cultural and religious celebration',
      traditions: ['Wearing green', 'Parades', 'Irish music', 'Traditional food'],
      funFacts: ['Shamrock is Ireland\'s symbol', 'Chicago dyes river green', 'Pinch tradition for not wearing green'],
      duration: '1 day',
      participants: 'Irish diaspora globally'
    },
    '2024-04-01': {
      name: 'April Fool\'s Day',
      emoji: '🤡',
      color: 'bg-orange-100',
      country: 'Worldwide',
      description: 'Day of pranks and practical jokes',
      traditions: ['Playing pranks', 'Fake news stories', 'Harmless jokes', 'Media hoaxes'],
      funFacts: ['Origins date to 1582', 'BBC famous for elaborate hoaxes', 'Noon deadline in some countries'],
      duration: '1 day (morning only in some places)',
      participants: 'Pranksters worldwide'
    },
    '2024-04-22': {
      name: 'Earth Day',
      emoji: '🌍',
      color: 'bg-blue-100',
      country: 'Worldwide',
      description: 'Environmental awareness and protection day',
      traditions: ['Tree planting', 'Clean-up drives', 'Environmental education', 'Green activities'],
      funFacts: ['Started in 1970', '1 billion people participate', 'Led to environmental laws'],
      duration: '1 day',
      participants: 'Over 190 countries'
    },
    '2024-05-05': {
      name: 'Cinco de Mayo',
      emoji: '🇲🇽',
      color: 'bg-red-100',
      country: 'Mexico & USA',
      description: 'Mexican-American celebration of heritage and pride',
      traditions: ['Mexican food', 'Folk dancing', 'Mariachi music', 'Colorful decorations'],
      funFacts: ['Commemorates Battle of Puebla', 'Bigger in USA than Mexico', 'Not Mexican Independence Day'],
      duration: '1 day',
      participants: 'Mexican-Americans mainly'
    },
    '2024-06-21': {
      name: 'Summer Solstice',
      emoji: '☀️',
      color: 'bg-yellow-100',
      country: 'Northern Hemisphere',
      description: 'Longest day of the year in Northern Hemisphere',
      traditions: ['Stonehenge gatherings', 'Midnight sun festivals', 'Bonfires', 'Nature celebrations'],
      funFacts: ['Sun never sets in Arctic Circle', 'Stonehenge aligns with sunrise', 'Opposite season in Southern Hemisphere'],
      duration: '1 day',
      participants: 'Cultures worldwide'
    },
    '2024-07-04': {
      name: 'Independence Day',
      emoji: '🇺🇸',
      color: 'bg-red-100',
      country: 'United States',
      description: 'American Independence Day celebration',
      traditions: ['Fireworks', 'BBQ parties', 'Parades', 'Flag displays'],
      funFacts: ['Commemorates 1776 Declaration', 'Nathan\'s Hot Dog Contest', 'Liberty Bell tradition'],
      duration: '1 day',
      participants: '330 million Americans'
    },
    '2024-08-15': {
      name: 'Independence Day',
      emoji: '🇮🇳',
      color: 'bg-orange-100',
      country: 'India',
      description: 'Indian Independence Day from British rule',
      traditions: ['Flag hoisting', 'Cultural programs', 'Kite flying', 'Patriotic songs'],
      funFacts: ['Freedom at midnight in 1947', 'Prime Minister\'s Red Fort speech', 'Tricolor flag represents unity'],
      duration: '1 day',
      participants: '1.4 billion Indians'
    },
    '2024-09-16': {
      name: 'Mexican Independence',
      emoji: '🇲🇽',
      color: 'bg-green-100',
      country: 'Mexico',
      description: 'Mexican Independence Day celebration',
      traditions: ['El Grito ceremony', 'Traditional food', 'Folk dancing', 'Fireworks'],
      funFacts: ['Started with Grito de Dolores', 'President rings historic bell', 'Not the same as Cinco de Mayo'],
      duration: '2 days',
      participants: '130 million Mexicans'
    },
    '2024-10-31': {
      name: 'Halloween',
      emoji: '🎃',
      color: 'bg-orange-100',
      country: 'USA, Canada, Ireland',
      description: 'Spooky celebration with costumes and candy',
      traditions: ['Trick-or-treating', 'Costume parties', 'Jack-o\'-lanterns', 'Haunted houses'],
      funFacts: ['Celtic origin as Samhain', '$6 billion spent on candy', 'Orange and black are traditional colors'],
      duration: '1 night',
      participants: 'Millions of children'
    },
    '2024-11-05': {
      name: 'Guy Fawkes Night',
      emoji: '🎆',
      color: 'bg-purple-100',
      country: 'United Kingdom',
      description: 'British celebration with bonfires and fireworks',
      traditions: ['Bonfire burning', 'Fireworks displays', 'Guy Fawkes effigies', 'Toffee apples'],
      funFacts: ['Commemorates failed Gunpowder Plot', 'Guy burned in effigy', 'Remember, remember the 5th of November'],
      duration: '1 night',
      participants: '67 million Britons'
    },
    '2024-11-28': {
      name: 'Thanksgiving',
      emoji: '🦃',
      color: 'bg-yellow-100',
      country: 'United States',
      description: 'American harvest festival of gratitude',
      traditions: ['Turkey dinner', 'Family gatherings', 'Gratitude sharing', 'Football watching'],
      funFacts: ['Started with Pilgrims in 1621', 'Macy\'s Parade tradition', 'Busiest travel day'],
      duration: '4-day weekend',
      participants: 'American families'
    },
    '2024-12-25': {
      name: 'Christmas',
      emoji: '🎄',
      color: 'bg-green-100',
      country: 'Worldwide',
      description: 'Christian celebration of Jesus Christ\'s birth',
      traditions: ['Gift giving', 'Christmas trees', 'Carol singing', 'Family dinners'],
      funFacts: ['Celebrated by 2.4 billion Christians', 'Santa Claus from St. Nicholas', 'Christmas trees from Germany'],
      duration: '12 days traditionally',
      participants: 'Billions worldwide'
    },
    '2024-12-31': {
      name: 'New Year\'s Eve',
      emoji: '🎊',
      color: 'bg-gold-100',
      country: 'Worldwide',
      description: 'Final day of the year celebration',
      traditions: ['Countdown parties', 'Champagne toasts', 'Resolutions making', 'Kissing at midnight'],
      funFacts: ['Times Square hosts 1 million people', 'Auld Lang Syne sung worldwide', 'Fireworks in major cities'],
      duration: '1 night',
      participants: 'Party-goers globally'
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const handleEventClick = (event: EventDetail) => {
    setSelectedEvent(event);
    setShowEventPopup(true);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md">
        <Button onClick={() => navigateMonth('prev')} variant="outline" size="sm">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="text-center">
          <h3 className="font-fredoka text-2xl font-bold text-gray-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <p className="font-comic text-sm text-gray-600">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
          </p>
        </div>
        <Button onClick={() => navigateMonth('next')} variant="outline" size="sm">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-blue-50">
          {dayNames.map(day => (
            <div key={day} className="p-3 text-center font-fredoka font-bold text-blue-700">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const dateKey = formatDateKey(day);
            const event = worldwideEvents[dateKey];
            const isCurrentMonthDay = isCurrentMonth(day);
            const isTodayDate = isToday(day);
            
            return (
              <div
                key={index}
                className={`
                  p-2 min-h-[80px] border border-gray-100 cursor-pointer transition-colors
                  ${!isCurrentMonthDay ? 'bg-gray-50 text-gray-400' : 'hover:bg-blue-50'}
                  ${isTodayDate ? 'bg-yellow-100 border-yellow-300' : ''}
                  ${event ? event.color : ''}
                  ${selectedDate?.toDateString() === day.toDateString() ? 'ring-2 ring-blue-400' : ''}
                `}
                onClick={() => setSelectedDate(day)}
              >
                <div className="text-center">
                  <div className={`
                    font-comic font-bold text-lg
                    ${isTodayDate ? 'text-yellow-700' : isCurrentMonthDay ? 'text-gray-800' : 'text-gray-400'}
                  `}>
                    {day.getDate()}
                  </div>
                  {event && (
                    <div className="mt-1">
                      <div 
                        className="text-xl cursor-pointer hover:scale-110 transition-transform"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event);
                        }}
                      >
                        {event.emoji}
                      </div>
                      <div className="text-xs font-comic font-bold text-gray-700 truncate">
                        {event.name}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Popup */}
      {showEventPopup && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <span className="text-4xl animate-bounce">{selectedEvent.emoji}</span>
                <div>
                  <h3 className="font-fredoka text-2xl font-bold text-gray-800">{selectedEvent.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="font-comic">{selectedEvent.country}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setShowEventPopup(false)}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                <h4 className="font-fredoka text-lg font-bold text-gray-800 mb-2">📖 About This Event</h4>
                <p className="font-comic text-gray-700">{selectedEvent.description}</p>
              </div>

              {/* Event Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <h4 className="font-fredoka font-bold text-green-700">Duration</h4>
                  </div>
                  <p className="font-comic text-green-800">{selectedEvent.duration}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-orange-600" />
                    <h4 className="font-fredoka font-bold text-orange-700">Participants</h4>
                  </div>
                  <p className="font-comic text-orange-800">{selectedEvent.participants}</p>
                </div>
              </div>

              {/* Traditions */}
              <div className="bg-pink-50 p-4 rounded-xl">
                <h4 className="font-fredoka text-lg font-bold text-pink-700 mb-3">🎭 Traditions & Customs</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {selectedEvent.traditions.map((tradition, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-pink-500">•</span>
                      <span className="font-comic text-pink-800">{tradition}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun Facts */}
              <div className="bg-yellow-50 p-4 rounded-xl">
                <h4 className="font-fredoka text-lg font-bold text-yellow-700 mb-3">🤔 Fun Facts</h4>
                <div className="space-y-2">
                  {selectedEvent.funFacts.map((fact, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-yellow-500 mt-1">💡</span>
                      <span className="font-comic text-yellow-800">{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Date Info */}
      {selectedDate && (
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl">
          <h4 className="font-fredoka text-xl font-bold text-gray-800 mb-2">
            📅 Selected Date
          </h4>
          <div className="space-y-2">
            <p className="font-comic text-lg">
              <strong>Date:</strong> {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            {worldwideEvents[formatDateKey(selectedDate)] && (
              <div className="flex items-center space-x-2">
                <span className="text-2xl">
                  {worldwideEvents[formatDateKey(selectedDate)].emoji}
                </span>
                <Badge className="bg-purple-200 text-purple-800 font-comic">
                  {worldwideEvents[formatDateKey(selectedDate)].name}
                </Badge>
                <Button
                  size="sm"
                  onClick={() => handleEventClick(worldwideEvents[formatDateKey(selectedDate)])}
                  className="ml-2 font-comic"
                >
                  Learn More
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Calendar Facts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-xl">
          <h4 className="font-fredoka font-bold text-green-700 mb-2">📚 Calendar Facts</h4>
          <ul className="font-comic text-sm space-y-1">
            <li>• A year has 365 days (366 in leap years)</li>
            <li>• A month has 28-31 days</li>
            <li>• A week has 7 days</li>
            <li>• February has 28 days (29 in leap years)</li>
            <li>• Different cultures use different calendars</li>
          </ul>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl">
          <h4 className="font-fredoka font-bold text-orange-700 mb-2">🌍 World Celebrations</h4>
          <div className="space-y-1 text-sm">
            {Object.entries(worldwideEvents).slice(0, 4).map(([date, event]) => (
              <div key={date} className="flex items-center space-x-2 font-comic">
                <span>{event.emoji}</span>
                <span>{event.name} - {event.country}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCalendar;
