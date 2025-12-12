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


export const createTask = (id: string, createdAt: number, title: string, priority: Priority = 'medium'): Task => {
  return {
    id,
    title,
    completed: false,
    priority,
    createdAt,
  };
};


export const addTask = (newTask: Task) => (tasks: Task[]): Task[] => {
  return [...tasks, newTask];
};

export const toggleTask = (id: string) => (tasks: Task[]): Task[] => {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
};

export const deleteTask = (id: string) => (tasks: Task[]): Task[] => {
  return tasks.filter((task) => task.id !== id);
};

export const updateTaskTitle = (id: string, newTitle: string) => (tasks: Task[]): Task[] => {
  return tasks.map((task) =>
    task.id === id ? { ...task, title: newTitle } : task
  );
};

export const updateTaskPriority = (id: string, priority: Priority) => (tasks: Task[]): Task[] => {
  return tasks.map((task) =>
    task.id === id ? { ...task, priority } : task
  );
};

export const clearCompleted = (tasks: Task[]): Task[] => {
  return tasks.filter((task) => !task.completed);
};

export const findTask = (id: string) => (tasks: Task[]): Maybe<Task> => {
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

export const filterTasks = filterBy;
export const sortTasks = sortBy;
