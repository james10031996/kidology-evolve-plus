
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const InteractiveCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const specialEvents = {
    '2024-01-01': { name: 'New Year', emoji: '🎉', color: 'bg-purple-100' },
    '2024-02-14': { name: 'Valentine\'s Day', emoji: '💝', color: 'bg-pink-100' },
    '2024-03-17': { name: 'St. Patrick\'s Day', emoji: '🍀', color: 'bg-green-100' },
    '2024-04-22': { name: 'Earth Day', emoji: '🌍', color: 'bg-blue-100' },
    '2024-05-12': { name: 'Mother\'s Day', emoji: '👩', color: 'bg-pink-100' },
    '2024-06-16': { name: 'Father\'s Day', emoji: '👨', color: 'bg-blue-100' },
    '2024-07-04': { name: 'Independence Day', emoji: '🇺🇸', color: 'bg-red-100' },
    '2024-10-31': { name: 'Halloween', emoji: '🎃', color: 'bg-orange-100' },
    '2024-11-28': { name: 'Thanksgiving', emoji: '🦃', color: 'bg-yellow-100' },
    '2024-12-25': { name: 'Christmas', emoji: '🎄', color: 'bg-green-100' },
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
            const event = specialEvents[dateKey as keyof typeof specialEvents];
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
                      <div className="text-xl">{event.emoji}</div>
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
            {specialEvents[formatDateKey(selectedDate) as keyof typeof specialEvents] && (
              <div className="flex items-center space-x-2">
                <span className="text-2xl">
                  {specialEvents[formatDateKey(selectedDate) as keyof typeof specialEvents].emoji}
                </span>
                <Badge className="bg-purple-200 text-purple-800 font-comic">
                  {specialEvents[formatDateKey(selectedDate) as keyof typeof specialEvents].name}
                </Badge>
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
          </ul>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl">
          <h4 className="font-fredoka font-bold text-orange-700 mb-2">🎉 Special Events</h4>
          <div className="space-y-1 text-sm">
            {Object.entries(specialEvents).slice(0, 4).map(([date, event]) => (
              <div key={date} className="flex items-center space-x-2 font-comic">
                <span>{event.emoji}</span>
                <span>{event.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCalendar;
