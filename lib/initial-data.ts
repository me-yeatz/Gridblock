import { Space, Base, Table, Task } from './types';

// Sample tasks
const sampleTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Design system setup',
    status: 'Done',
    priority: 'High',
    assignee: 'Alice',
    dueDate: '2025-12-20',
    startDate: '2025-12-15',
    description: 'Set up the design system foundation',
  },
  {
    id: 'task-2',
    title: 'API integration',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Bob',
    dueDate: '2025-12-25',
    startDate: '2025-12-18',
  },
  {
    id: 'task-3',
    title: 'User testing',
    status: 'Todo',
    priority: 'Medium',
    assignee: 'Charlie',
    dueDate: '2025-12-30',
  },
];

const marketingTasks: Task[] = [
  {
    id: 'task-4',
    title: 'Social media campaign',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Diana',
    dueDate: '2025-12-22',
  },
  {
    id: 'task-5',
    title: 'Blog post draft',
    status: 'Todo',
    priority: 'Low',
    assignee: 'Eve',
    dueDate: '2025-12-28',
  },
];

const personalTasks: Task[] = [
  {
    id: 'task-6',
    title: 'Review documents',
    status: 'Todo',
    priority: 'High',
    assignee: 'You',
    dueDate: '2025-12-24',
  },
  {
    id: 'task-7',
    title: 'Team meeting prep',
    status: 'Done',
    priority: 'Medium',
    assignee: 'You',
    dueDate: '2025-12-23',
  },
];

// Initial data structure
export const initialSpaces: Space[] = [
  {
    id: 'space-1',
    name: 'Personal Workspace',
    isPinned: true,
    bases: [
      {
        id: 'base-1',
        name: 'Project Alpha',
        icon: '🚀',
        color: 'purple',
        owner: 'You',
        createdAt: '2025-12-01',
        lastOpened: '2025-12-24',
        tables: [
          {
            id: 'table-1',
            name: 'Tasks',
            icon: '📋',
            tasks: sampleTasks,
            activeView: 'grid',
            createdAt: '2025-12-01',
            lastModified: '2025-12-24',
          },
          {
            id: 'table-2',
            name: 'Backlog',
            icon: '📦',
            tasks: [],
            activeView: 'grid',
            createdAt: '2025-12-05',
            lastModified: '2025-12-20',
          },
        ],
      },
      {
        id: 'base-2',
        name: 'Personal Tasks',
        icon: '✅',
        color: 'blue',
        owner: 'You',
        createdAt: '2025-12-10',
        lastOpened: '2025-12-23',
        tables: [
          {
            id: 'table-3',
            name: 'Daily Tasks',
            icon: '📝',
            tasks: personalTasks,
            activeView: 'grid',
            createdAt: '2025-12-10',
            lastModified: '2025-12-23',
          },
        ],
      },
    ],
  },
  {
    id: 'space-2',
    name: 'Work',
    bases: [
      {
        id: 'base-3',
        name: 'Marketing Tasks',
        icon: '📢',
        color: 'green',
        owner: 'Team',
        createdAt: '2025-12-05',
        lastOpened: '2025-12-22',
        tables: [
          {
            id: 'table-4',
            name: 'Campaigns',
            icon: '🎯',
            tasks: marketingTasks,
            activeView: 'grid',
            createdAt: '2025-12-05',
            lastModified: '2025-12-22',
          },
          {
            id: 'table-5',
            name: 'Content Calendar',
            icon: '📅',
            tasks: [],
            activeView: 'calendar',
            createdAt: '2025-12-05',
            lastModified: '2025-12-20',
          },
        ],
      },
    ],
  },
];

export const getInitialAppState = () => {
  return {
    spaces: initialSpaces,
    activeSpaceId: 'space-1',
    activeBaseId: 'base-1',
    activeTableId: 'table-1',
  };
};
