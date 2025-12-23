// Core data types for Gridblock
export type ViewType = 'grid' | 'kanban' | 'calendar' | 'gantt' | 'form';

export type Task = {
  id: string;
  title: string;
  status: 'Todo' | 'In Progress' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  dueDate: string;
  description?: string;
  startDate?: string;
};

export type Table = {
  id: string;
  name: string;
  icon?: string;
  tasks: Task[];
  activeView: ViewType;
  createdAt: string;
  lastModified: string;
};

export type Base = {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  tables: Table[];
  createdAt: string;
  lastOpened: string;
  owner: string;
};

export type Space = {
  id: string;
  name: string;
  bases: Base[];
  isPinned?: boolean;
};

export type AppState = {
  spaces: Space[];
  activeSpaceId: string | null;
  activeBaseId: string | null;
  activeTableId: string | null;
};
