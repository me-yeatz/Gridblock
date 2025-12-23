import { supabase } from '@/lib/supabase';
import { createTaskSchema, updateTaskSchema, type CreateTaskInput, type UpdateTaskInput } from '@/lib/validations';

// Define types for our data
export type Task = {
  id: string;
  title: string;
  status: 'Todo' | 'In Progress' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  assignee?: string;
  dueDate?: string;
  progress?: number;
  created_at?: string;
};

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => new Date().toISOString().split('T')[0];

// Service functions for interacting with Supabase
export const taskService = {
  // Fetch all tasks
  async getAllTasks() {
    if (!supabase) {
      console.warn('Supabase client not configured. Returning mock data.');
      // Return mock data with current dates
      const today = getCurrentDate();
      return [
        { id: '1', title: 'Sample Task', status: 'Todo', priority: 'Medium', assignee: 'User', dueDate: today, progress: 30 },
        { id: '2', title: 'Another Task', status: 'In Progress', priority: 'High', assignee: 'Admin', dueDate: today, progress: 65 },
        { id: '3', title: 'Completed Task', status: 'Done', priority: 'Low', assignee: 'User', dueDate: today, progress: 100 }
      ];
    }

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error);
      throw new Error('Failed to fetch tasks');
    }

    return data;
  },

  // Get a single task by ID
  async getTaskById(id: string) {
    if (!supabase) {
      console.error('Supabase client not configured');
      throw new Error('Supabase client not configured');
    }

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching task:', error);
      throw new Error('Failed to fetch task');
    }

    return data;
  },

  // Create a new task with validation
  async createTask(task: CreateTaskInput) {
    // Validate input
    const validation = createTaskSchema.safeParse(task);
    if (!validation.success) {
      const errors = validation.error.errors.map(e => e.message).join(', ');
      throw new Error(`Validation failed: ${errors}`);
    }

    if (!supabase) {
      console.error('Supabase client not configured');
      throw new Error('Supabase client not configured');
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([validation.data])
      .select()
      .single();

    if (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task');
    }

    return data;
  },

  // Update a task with validation
  async updateTask(id: string, updates: UpdateTaskInput) {
    // Validate input
    const validation = updateTaskSchema.safeParse(updates);
    if (!validation.success) {
      const errors = validation.error.errors.map(e => e.message).join(', ');
      throw new Error(`Validation failed: ${errors}`);
    }

    if (!supabase) {
      console.error('Supabase client not configured');
      throw new Error('Supabase client not configured');
    }

    const { data, error } = await supabase
      .from('tasks')
      .update(validation.data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task');
    }

    return data;
  },

  // Delete a task
  async deleteTask(id: string) {
    if (!supabase) {
      console.error('Supabase client not configured');
      throw new Error('Supabase client not configured');
    }

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to delete task');
    }
  },
};