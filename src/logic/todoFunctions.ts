import { v4 as uuidv4 } from 'uuid';
import { pipe } from './utils';
import { Maybe } from './monads';

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}

export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'date' | 'priority';

export const createTask = (title: string, priority: Priority = 'medium'): Task => {
  return {
    id: uuidv4(),
    title,
    completed: false,
    priority,
    createdAt: Date.now(),
  };
};

export const addTask = (tasks: Task[], newTask: Task): Task[] => {
  return [...tasks, newTask];
};

export const toggleTask = (tasks: Task[], id: string): Task[] => {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
};

export const deleteTask = (tasks: Task[], id: string): Task[] => {
  return tasks.filter((task) => task.id !== id);
};

export const updateTaskTitle = (tasks: Task[], id: string, newTitle: string): Task[] => {
  return tasks.map((task) =>
    task.id === id ? { ...task, title: newTitle } : task
  );
};

export const updateTaskPriority = (tasks: Task[], id: string, priority: Priority): Task[] => {
  return tasks.map((task) =>
    task.id === id ? { ...task, priority } : task
  );
};

export const clearCompleted = (tasks: Task[]): Task[] => {
  return tasks.filter((task) => !task.completed);
};

export const findTask = (tasks: Task[], id: string): Maybe<Task> => {
  const task = tasks.find(t => t.id === id);
  return Maybe.fromNullable(task);
};

const filterBy = (filter: FilterType) => (tasks: Task[]): Task[] => {
  switch (filter) {
    case 'active':
      return tasks.filter((task) => !task.completed);
    case 'completed':
      return tasks.filter((task) => task.completed);
    case 'all':
    default:
      return tasks;
  }
};

const sortBy = (sort: SortType) => (tasks: Task[]): Task[] => {
  const priorityWeight = { high: 3, medium: 2, low: 1 };
  const sorted = [...tasks];

  if (sort === 'date') {
    return sorted.sort((a, b) => b.createdAt - a.createdAt);
  }
  if (sort === 'priority') {
    return sorted.sort((a, b) => {
      const diff = priorityWeight[b.priority] - priorityWeight[a.priority];
      if (diff !== 0) return diff;
      return b.createdAt - a.createdAt;
    });
  }
  return sorted;
};

export const processTasks = (tasks: Task[], filter: FilterType, sort: SortType): Task[] => {
  return pipe(
    filterBy(filter),
    sortBy(sort)
  )(tasks);
};

export const filterTasks = (tasks: Task[], filter: FilterType): Task[] => filterBy(filter)(tasks);
export const sortTasks = (tasks: Task[], sort: SortType): Task[] => sortBy(sort)(tasks);
