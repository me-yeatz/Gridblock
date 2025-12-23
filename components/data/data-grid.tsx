"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, Search, Trash2, Copy } from 'lucide-react';
import { Task } from '@/lib/types';

interface DataGridProps {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
  tableName: string;
}

const DataGrid = ({ tasks, onTasksChange, tableName }: DataGridProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCell, setEditingCell] = useState<{ taskId: string; field: string } | null>(null);
  const [showMenu, setShowMenu] = useState<string | null>(null);

  // Filter tasks
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate ID
  const genId = () => `task-${Date.now()}`;

  // Add new row
  const addRow = () => {
    const newTask: Task = {
      id: genId(),
      title: '',
      status: 'Todo',
      priority: 'Medium',
      assignee: '',
      dueDate: new Date().toISOString().split('T')[0],
    };
    onTasksChange([...tasks, newTask]);
    setTimeout(() => setEditingCell({ taskId: newTask.id, field: 'title' }), 50);
  };

  // Update task
  const updateTask = (taskId: string, field: string, value: string) => {
    const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, [field]: value } : t);
    onTasksChange(updatedTasks);
  };

  // Delete task
  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    onTasksChange(updatedTasks);
    setShowMenu(null);
  };

  // Duplicate task
  const duplicateTask = (task: Task) => {
    const newTask = { ...task, id: genId(), title: `${task.title} (copy)` };
    onTasksChange([...tasks, newTask]);
    setShowMenu(null);
  };

  // Status colors (Teable style)
  const statusConfig: Record<string, { bg: string; text: string }> = {
    'Todo': { bg: 'bg-zinc-700', text: 'text-zinc-300' },
    'In Progress': { bg: 'bg-blue-600', text: 'text-white' },
    'Done': { bg: 'bg-green-600', text: 'text-white' },
  };

  // Priority colors
  const priorityConfig: Record<string, { dot: string; text: string }> = {
    'High': { dot: 'bg-red-500', text: 'text-red-400' },
    'Medium': { dot: 'bg-yellow-500', text: 'text-yellow-400' },
    'Low': { dot: 'bg-green-500', text: 'text-green-400' },
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 glass-light">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 glass-light accent-border rounded-xl text-sm text-[#EDC5BB] placeholder-gray-600 focus:outline-none focus:glass focus:glow-rose"
          />
        </div>
        <span className="text-sm text-gray-400">{filteredTasks.length} rows</span>
      </div>

      {/* Table - Teable Style */}
      <div className="flex-1 overflow-auto" onClick={() => setShowMenu(null)}>
        <table className="w-full">
          {/* Header */}
          <thead className="sticky top-0 z-10">
            <tr className="glass border-b border-white/10 text-xs text-gray-300 uppercase">
              <th className="px-4 py-3 text-left font-medium w-[300px]">Title</th>
              <th className="px-4 py-3 text-left font-medium w-[120px]">Status</th>
              <th className="px-4 py-3 text-left font-medium w-[100px]">Priority</th>
              <th className="px-4 py-3 text-left font-medium w-[140px]">Assignee</th>
              <th className="px-4 py-3 text-left font-medium w-[120px]">Due Date</th>
              <th className="px-4 py-3 w-[50px]"></th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filteredTasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-white/5 hover:glass-light transition-colors"
              >
                {/* Title */}
                <td className="px-4 py-3">
                  {editingCell?.taskId === task.id && editingCell?.field === 'title' ? (
                    <input
                      autoFocus
                      type="text"
                      defaultValue={task.title}
                      onBlur={(e) => {
                        updateTask(task.id, 'title', e.target.value);
                        setEditingCell(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          updateTask(task.id, 'title', e.currentTarget.value);
                          setEditingCell(null);
                        }
                        if (e.key === 'Escape') setEditingCell(null);
                      }}
                      className="w-full glass accent-border glow-rose rounded-lg px-2 py-1 text-sm text-white focus:outline-none"
                    />
                  ) : (
                    <div
                      onClick={() => setEditingCell({ taskId: task.id, field: 'title' })}
                      className="cursor-pointer text-sm text-gray-200 hover:text-white"
                    >
                      {task.title || <span className="text-gray-500 italic">Untitled</span>}
                    </div>
                  )}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  {editingCell?.taskId === task.id && editingCell?.field === 'status' ? (
                    <select
                      autoFocus
                      defaultValue={task.status}
                      onChange={(e) => {
                        updateTask(task.id, 'status', e.target.value);
                        setEditingCell(null);
                      }}
                      onBlur={() => setEditingCell(null)}
                      className="glass accent-border glow-rose rounded-lg px-2 py-1 text-sm text-white focus:outline-none"
                    >
                      <option value="Todo">Todo</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  ) : (
                    <span
                      onClick={() => setEditingCell({ taskId: task.id, field: 'status' })}
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${statusConfig[task.status]?.bg} ${statusConfig[task.status]?.text}`}
                    >
                      {task.status}
                    </span>
                  )}
                </td>

                {/* Priority */}
                <td className="px-4 py-3">
                  {editingCell?.taskId === task.id && editingCell?.field === 'priority' ? (
                    <select
                      autoFocus
                      defaultValue={task.priority}
                      onChange={(e) => {
                        updateTask(task.id, 'priority', e.target.value);
                        setEditingCell(null);
                      }}
                      onBlur={() => setEditingCell(null)}
                      className="glass accent-border glow-rose rounded-lg px-2 py-1 text-sm text-white focus:outline-none"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  ) : (
                    <div
                      onClick={() => setEditingCell({ taskId: task.id, field: 'priority' })}
                      className={`flex items-center gap-2 cursor-pointer text-sm ${priorityConfig[task.priority]?.text}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${priorityConfig[task.priority]?.dot}`}></span>
                      {task.priority}
                    </div>
                  )}
                </td>

                {/* Assignee */}
                <td className="px-4 py-3">
                  {editingCell?.taskId === task.id && editingCell?.field === 'assignee' ? (
                    <input
                      autoFocus
                      type="text"
                      defaultValue={task.assignee}
                      onBlur={(e) => {
                        updateTask(task.id, 'assignee', e.target.value);
                        setEditingCell(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          updateTask(task.id, 'assignee', e.currentTarget.value);
                          setEditingCell(null);
                        }
                        if (e.key === 'Escape') setEditingCell(null);
                      }}
                      className="w-full glass accent-border glow-rose rounded-lg px-2 py-1 text-sm text-white focus:outline-none"
                    />
                  ) : (
                    <div
                      onClick={() => setEditingCell({ taskId: task.id, field: 'assignee' })}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-xs text-white font-medium">
                        {task.assignee?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <span className="text-sm text-zinc-300">{task.assignee || <span className="text-zinc-500">-</span>}</span>
                    </div>
                  )}
                </td>

                {/* Due Date */}
                <td className="px-4 py-3">
                  {editingCell?.taskId === task.id && editingCell?.field === 'dueDate' ? (
                    <input
                      autoFocus
                      type="date"
                      defaultValue={task.dueDate}
                      onBlur={(e) => {
                        updateTask(task.id, 'dueDate', e.target.value);
                        setEditingCell(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') setEditingCell(null);
                      }}
                      className="glass accent-border glow-rose rounded-lg px-2 py-1 text-sm text-white focus:outline-none"
                    />
                  ) : (
                    <span
                      onClick={() => setEditingCell({ taskId: task.id, field: 'dueDate' })}
                      className="text-sm text-gray-300 cursor-pointer hover:text-white"
                    >
                      {task.dueDate || '-'}
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(showMenu === task.id ? null : task.id);
                    }}
                    className="p-1 rounded hover:bg-zinc-700 text-zinc-500 hover:text-zinc-300"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {showMenu === task.id && (
                    <div className="absolute right-4 top-10 z-20 w-36 glass-strong border border-white/20 rounded-xl shadow-2xl glow py-1">
                      <button
                        onClick={() => duplicateTask(task)}
                        className="w-full px-3 py-2 text-left text-sm text-gray-200 hover:glass hover:text-white rounded-lg flex items-center gap-2 transition-all"
                      >
                        <Copy className="w-4 h-4" /> Duplicate
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="w-full px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/20 hover:text-red-200 rounded-lg flex items-center gap-2 transition-all"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <p className="text-lg mb-2">No tasks found</p>
            <p className="text-sm">Click "Add row" to create your first task</p>
          </div>
        )}
      </div>

      {/* Add Row Button - Teable Style */}
      <button
        onClick={addRow}
        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-400 hover:text-white hover:glass-light border-t border-white/10 glass-hover transition-all"
      >
        <Plus className="w-4 h-4" />
        Add row
      </button>
    </div>
  );
};

export { DataGrid };
