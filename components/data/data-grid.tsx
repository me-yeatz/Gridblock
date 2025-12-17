"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { ArrowUpDown, Plus, MoreHorizontal, Search, Loader2, Filter, X, Trash2, Edit } from 'lucide-react';
import { Task, taskService } from '@/lib/task-service';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

const DataGrid = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch tasks from Supabase using React Query
  const { data: tasks = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getAllTasks,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Create task mutation
  const createMutation = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Delete task mutation
  const deleteMutation = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setShowActionMenu(null);
    },
  });

  // Filter data based on status and priority
  const filteredData = useMemo(() => {
    let filtered = tasks;

    if (statusFilter) {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (priorityFilter) {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    return filtered;
  }, [tasks, statusFilter, priorityFilter]);

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "title",
      header: () => <div className="font-medium text-zinc-300">Name</div>,
      cell: (info) => (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <span className="font-medium text-zinc-200">{info.getValue() as string}</span>
        </div>
      ),
      size: 200,
    },
    {
      accessorKey: "status",
      header: () => <div className="font-medium text-zinc-300">Status</div>,
      cell: (info) => {
        const status = info.getValue() as string;
        let statusColor = "bg-zinc-700 text-zinc-300";

        if (status === "Done") statusColor = "bg-green-900/50 text-green-400 border border-green-800/50";
        if (status === "In Progress") statusColor = "bg-blue-900/50 text-blue-400 border border-blue-800/50";
        if (status === "Todo") statusColor = "bg-zinc-800 text-zinc-300 border border-zinc-700";

        return (
          <span className={`px-2 py-1 rounded text-xs ${statusColor}`}>
            {status}
          </span>
        );
      },
      size: 120,
    },
    {
      accessorKey: "priority",
      header: () => <div className="font-medium text-zinc-300">Priority</div>,
      cell: (info) => {
        const priority = info.getValue() as string;
        let priorityColor = "text-zinc-400";

        if (priority === "High") priorityColor = "text-red-400";
        if (priority === "Medium") priorityColor = "text-yellow-400";
        if (priority === "Low") priorityColor = "text-green-400";

        return (
          <div className={`flex items-center gap-1.5 ${priorityColor}`}>
            <div className={`w-2 h-2 rounded-full ${priority === 'High' ? 'bg-red-500' : priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
            <span className="text-xs">{priority}</span>
          </div>
        );
      },
      size: 100,
    },
    {
      accessorKey: "assignee",
      header: () => <div className="font-medium text-zinc-300">Assignee</div>,
      cell: (info) => {
        const assignee = info.getValue() as string | undefined;
        return (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-xs text-white" title={assignee || 'Unassigned'}>
              {assignee?.charAt(0) || '?'}
            </div>
            <span className="text-zinc-300 text-sm">{assignee || 'Unassigned'}</span>
          </div>
        );
      },
      size: 120,
    },
    {
      accessorKey: "dueDate",
      header: () => <div className="font-medium text-zinc-300">Due Date</div>,
      cell: (info) => {
        const date = info.getValue() as string | undefined;
        return (
          <span className="text-zinc-400 text-sm">{date || '-'}</span>
        );
      },
      size: 100,
    },
    {
      accessorKey: "progress",
      header: () => <div className="font-medium text-zinc-300">Progress</div>,
      cell: (info) => {
        const progress = (info.getValue() as number | undefined) ?? 0;
        return (
          <div className="flex items-center gap-2">
            <div className="w-full bg-zinc-800 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${
                  progress === 100 ? 'bg-green-500' :
                  progress > 70 ? 'bg-blue-500' :
                  progress > 30 ? 'bg-yellow-500' : 'bg-zinc-600'
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-zinc-400 w-8">{progress}%</span>
          </div>
        );
      },
      size: 120,
    },
    {
      id: 'actions',
      header: () => <div className="font-medium text-zinc-300">Actions</div>,
      cell: ({ row }) => (
        <div className="relative">
          <button
            className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            onClick={(e) => {
              e.stopPropagation();
              setShowActionMenu(showActionMenu === row.original.id ? null : row.original.id);
            }}
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          {showActionMenu === row.original.id && (
            <div className="absolute right-0 top-8 z-50 w-36 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg py-1">
              <button
                className="w-full px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-700 flex items-center gap-2"
                onClick={() => {
                  // TODO: Implement edit functionality
                  setShowActionMenu(null);
                }}
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button
                className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-zinc-700 flex items-center gap-2"
                onClick={() => deleteMutation.mutate(row.original.id)}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          )}
        </div>
      ),
      size: 60,
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const addNewRow = async () => {
    const newTask = {
      title: `New Task ${tasks.length + 1}`,
      status: "Todo" as const,
      priority: "Medium" as const,
      assignee: "Unassigned",
      dueDate: new Date().toISOString().split('T')[0],
      progress: 0,
    };
    createMutation.mutate(newTask);
  };

  const clearFilters = () => {
    setStatusFilter('');
    setPriorityFilter('');
    setGlobalFilter('');
  };

  const hasActiveFilters = statusFilter || priorityFilter || globalFilter;

  if (isError) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm p-8 text-center">
        <p className="text-zinc-400">Failed to load data. Please try again later.</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 text-sm rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition-opacity"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm overflow-hidden">
      {/* Grid Header */}
      <div className="flex items-center justify-between p-3 border-b border-zinc-800 bg-zinc-900/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search records..."
              className="pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500 w-64"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-purple-600/20 text-purple-400 hover:bg-purple-600/30"
            >
              <X className="w-3 h-3" /> Clear filters
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border transition-colors ${
              showFilters ? 'border-purple-500 text-purple-400 bg-purple-500/10' : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800/50'
            }`}
          >
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button
            onClick={addNewRow}
            disabled={createMutation.isPending}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {createMutation.isPending ? 'Adding...' : 'Add Record'}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="p-3 border-b border-zinc-800 bg-zinc-900/20 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs text-zinc-400">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="">All</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-zinc-400">Priority:</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto" onClick={() => setShowActionMenu(null)}>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : table.getRowModel().rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
            <p className="text-lg mb-2">No tasks found</p>
            <p className="text-sm">
              {hasActiveFilters ? 'Try adjusting your filters' : 'Click "Add Record" to create your first task'}
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/50 text-zinc-400 uppercase text-xs font-mono border-b border-zinc-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 font-normal text-left hover:bg-zinc-800/30 transition-colors cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ArrowUpDown className="w-3 h-3 text-purple-400" />,
                          desc: <ArrowUpDown className="w-3 h-3 text-purple-400 rotate-180" />,
                        }[header.column.getIsSorted() as string] ?? <ArrowUpDown className="w-3 h-3 text-zinc-600" />}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-zinc-900/40 transition-colors cursor-pointer group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-zinc-300">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer with Pagination */}
      <div className="px-4 py-2 border-t border-zinc-800 bg-zinc-900/30 text-sm flex justify-between items-center text-zinc-400">
        <div>
          Showing{' '}
          <span className="text-zinc-300">
            {table.getRowModel().rows.length > 0 ? table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1 : 0}
          </span>
          {' '}-{' '}
          <span className="text-zinc-300">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              filteredData.length
            )}
          </span>
          {' '}of{' '}
          <span className="text-zinc-300">{filteredData.length}</span> records
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt;
          </button>
          <span className="px-2">
            {table.getPageCount() > 0 ? table.getState().pagination.pageIndex + 1 : 0} of {table.getPageCount() || 1}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export { DataGrid };
