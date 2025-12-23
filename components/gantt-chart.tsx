'use client';

import { useState, useMemo } from 'react';
import {
  format,
  startOfWeek,
  addDays,
  differenceInDays,
  isWithinInterval,
  parseISO,
  startOfDay,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Task } from '@/lib/task-service';

interface GanttChartProps {
  tasks: Task[];
}

const GanttChart = ({ tasks }: GanttChartProps) => {
  const [startDate, setStartDate] = useState(() => startOfWeek(new Date()));
  const daysToShow = 14;

  const dates = useMemo(() => {
    return Array.from({ length: daysToShow }, (_, i) => addDays(startDate, i));
  }, [startDate]);

  const prevWeek = () => setStartDate(addDays(startDate, -7));
  const nextWeek = () => setStartDate(addDays(startDate, 7));
  const goToToday = () => setStartDate(startOfWeek(new Date()));

  // Process tasks for Gantt display
  const ganttTasks = useMemo(() => {
    return tasks.map((task) => {
      const taskStart = task.dueDate ? parseISO(task.dueDate) : new Date();
      // Simulate task duration based on progress
      const duration = Math.max(1, Math.ceil((100 - (task.progress || 0)) / 25));
      const taskEnd = addDays(taskStart, duration);

      return {
        ...task,
        startDate: taskStart,
        endDate: taskEnd,
        duration,
      };
    });
  }, [tasks]);

  const getTaskPosition = (task: typeof ganttTasks[0]) => {
    const rangeStart = startOfDay(startDate);
    const rangeEnd = addDays(rangeStart, daysToShow);

    // Check if task overlaps with visible range
    if (task.endDate < rangeStart || task.startDate > rangeEnd) {
      return null;
    }

    const visibleStart = task.startDate < rangeStart ? rangeStart : task.startDate;
    const visibleEnd = task.endDate > rangeEnd ? rangeEnd : task.endDate;

    const startOffset = Math.max(0, differenceInDays(visibleStart, rangeStart));
    const width = differenceInDays(visibleEnd, visibleStart) + 1;

    return {
      left: `${(startOffset / daysToShow) * 100}%`,
      width: `${(width / daysToShow) * 100}%`,
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'from-green-500 to-green-600';
      case 'In Progress':
        return 'from-blue-500 to-blue-600';
      default:
        return 'from-zinc-500 to-zinc-600';
    }
  };

  const getPriorityGlow = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'shadow-[0_0_15px_rgba(239,68,68,0.4)]';
      case 'Medium':
        return 'shadow-[0_0_10px_rgba(234,179,8,0.3)]';
      default:
        return '';
    }
  };

  return (
    <div className="bg-zinc-900/30 backdrop-blur-sm rounded-xl border border-zinc-800/50 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800/50 bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
              Gantt Chart
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                Free
              </span>
            </h3>
            <p className="text-xs text-zinc-500">Visual timeline of your tasks</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-xs rounded-lg border border-zinc-700/50 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-all"
          >
            Today
          </button>
          <div className="flex items-center border border-zinc-700/50 rounded-lg overflow-hidden">
            <button
              onClick={prevWeek}
              className="p-2 hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 text-xs text-zinc-400 min-w-[140px] text-center">
              {format(startDate, 'MMM d')} - {format(addDays(startDate, daysToShow - 1), 'MMM d, yyyy')}
            </span>
            <button
              onClick={nextWeek}
              className="p-2 hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Header */}
      <div className="flex border-b border-zinc-800/50 bg-zinc-900/30">
        <div className="w-48 shrink-0 p-3 text-xs font-medium text-zinc-500 border-r border-zinc-800/50">
          Task
        </div>
        <div className="flex-1 flex">
          {dates.map((date, i) => {
            const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
            const isWeekend = [0, 6].includes(date.getDay());
            return (
              <div
                key={i}
                className={`flex-1 p-2 text-center border-r border-zinc-800/30 last:border-r-0 ${
                  isWeekend ? 'bg-zinc-800/20' : ''
                } ${isToday ? 'bg-purple-500/10' : ''}`}
              >
                <div className={`text-[10px] ${isToday ? 'text-purple-400' : 'text-zinc-500'}`}>
                  {format(date, 'EEE')}
                </div>
                <div className={`text-xs font-medium ${isToday ? 'text-purple-400' : 'text-zinc-400'}`}>
                  {format(date, 'd')}
                </div>
                {isToday && (
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mx-auto mt-1 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Rows */}
      <div className="max-h-[400px] overflow-y-auto">
        {ganttTasks.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">
            <p>No tasks to display</p>
            <p className="text-xs mt-1">Add tasks to see them in the timeline</p>
          </div>
        ) : (
          ganttTasks.map((task) => {
            const position = getTaskPosition(task);
            return (
              <div
                key={task.id}
                className="flex border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors"
              >
                {/* Task Name */}
                <div className="w-48 shrink-0 p-3 border-r border-zinc-800/50">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        task.priority === 'High'
                          ? 'bg-red-500'
                          : task.priority === 'Medium'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    />
                    <span className="text-sm text-zinc-300 truncate">{task.title}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      task.status === 'Done' ? 'bg-green-500/20 text-green-400' :
                      task.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-zinc-700 text-zinc-400'
                    }`}>
                      {task.status}
                    </span>
                    <span className="text-[10px] text-zinc-500">{task.progress}%</span>
                  </div>
                </div>

                {/* Timeline Bar */}
                <div className="flex-1 relative py-3">
                  {/* Background grid */}
                  <div className="absolute inset-0 flex">
                    {dates.map((date, i) => {
                      const isWeekend = [0, 6].includes(date.getDay());
                      const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                      return (
                        <div
                          key={i}
                          className={`flex-1 border-r border-zinc-800/30 last:border-r-0 ${
                            isWeekend ? 'bg-zinc-800/10' : ''
                          } ${isToday ? 'bg-purple-500/5' : ''}`}
                        />
                      );
                    })}
                  </div>

                  {/* Task Bar */}
                  {position && (
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 h-7 rounded-md bg-gradient-to-r ${getStatusColor(task.status)} ${getPriorityGlow(task.priority)} transition-all cursor-pointer hover:brightness-110`}
                      style={{
                        left: position.left,
                        width: position.width,
                        minWidth: '20px',
                      }}
                    >
                      {/* Progress indicator */}
                      <div
                        className="absolute inset-0 bg-white/20 rounded-md"
                        style={{ width: `${task.progress}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white truncate px-2">
                        {task.title}
                      </span>
                    </div>
                  )}

                  {/* Today line */}
                  {dates.some(d => format(d, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')) && (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                      style={{
                        left: `${((differenceInDays(new Date(), startDate)) / daysToShow) * 100}%`,
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 p-3 border-t border-zinc-800/50 bg-zinc-900/30 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-green-500 to-green-600" />
          <span className="text-zinc-500">Done</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-500 to-blue-600" />
          <span className="text-zinc-500">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-zinc-500 to-zinc-600" />
          <span className="text-zinc-500">Todo</span>
        </div>
        <div className="ml-auto text-zinc-600">
          Scroll to see more tasks
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
