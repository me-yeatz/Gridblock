'use client';

import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  color?: string;
}

interface CalendarViewProps {
  events?: CalendarEvent[];
  onAddEvent?: (date: Date) => void;
}

const CalendarView = ({ events = [], onAddEvent }: CalendarViewProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <p className="text-sm text-zinc-500">
          {format(new Date(), "EEEE, MMMM d")}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={goToToday}>
          Today
        </Button>
        <div className="flex items-center border border-zinc-700/50 rounded-lg overflow-hidden">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => onAddEvent?.(selectedDate)}
        >
          New Event
        </Button>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-zinc-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const dayEvents = events.filter((event) => isSameDay(event.date, day));
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = isSameDay(day, selectedDate);
        const isTodayDate = isToday(day);

        days.push(
          <div
            key={day.toString()}
            className={`
              relative min-h-[100px] p-2 border-r border-b border-zinc-800/50
              cursor-pointer transition-all group
              ${!isCurrentMonth ? 'bg-zinc-900/30' : 'bg-zinc-900/10 hover:bg-zinc-800/30'}
              ${isSelected ? 'ring-2 ring-purple-500/50 ring-inset' : ''}
            `}
            onClick={() => setSelectedDate(cloneDay)}
          >
            {/* Date number */}
            <div className={`
              w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium mb-1
              transition-all
              ${isTodayDate
                ? 'bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : isCurrentMonth
                  ? 'text-zinc-300 group-hover:bg-zinc-700/50'
                  : 'text-zinc-600'
              }
            `}>
              {format(day, 'd')}
            </div>

            {/* Events */}
            <div className="space-y-1">
              {dayEvents.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className={`
                    text-[10px] px-1.5 py-0.5 rounded truncate
                    ${event.color || 'bg-purple-500/20 text-purple-300 border border-purple-500/30'}
                  `}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-[10px] text-zinc-500 px-1">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>

            {/* Hover indicator to add */}
            <button
              className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 p-1 rounded bg-zinc-800/80 text-zinc-400 hover:text-purple-400 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onAddEvent?.(cloneDay);
              }}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return <div className="border-l border-t border-zinc-800/50 rounded-lg overflow-hidden">{rows}</div>;
  };

  // Sample events for demo
  const sampleEvents: CalendarEvent[] = [
    { id: '1', title: 'Team Meeting', date: new Date(), color: 'bg-blue-500/20 text-blue-300 border border-blue-500/30' },
    { id: '2', title: 'Project Review', date: addDays(new Date(), 2), color: 'bg-green-500/20 text-green-300 border border-green-500/30' },
    { id: '3', title: 'Sprint Planning', date: addDays(new Date(), 5), color: 'bg-purple-500/20 text-purple-300 border border-purple-500/30' },
    ...events,
  ];

  return (
    <div className="bg-zinc-900/30 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-6 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      {/* Selected date info */}
      <div className="mt-4 p-4 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
        <h4 className="text-sm font-medium text-zinc-300 mb-2">
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </h4>
        {sampleEvents.filter(e => isSameDay(e.date, selectedDate)).length > 0 ? (
          <div className="space-y-2">
            {sampleEvents.filter(e => isSameDay(e.date, selectedDate)).map(event => (
              <div key={event.id} className="flex items-center gap-2 text-sm text-zinc-400">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                {event.title}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-500">No events scheduled</p>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
