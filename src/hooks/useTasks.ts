import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Task, Priority } from '../logic/todoFunctions';
import {
  createTask,
  addTask as addTaskPure,
  toggleTask as toggleTaskPure,
  deleteTask as deleteTaskPure,
  updateTaskTitle as updateTaskTitlePure,
  updateTaskPriority as updateTaskPriorityPure,
  clearCompleted as clearCompletedPure
} from '../logic/todoFunctions';
import { safeParseJSON } from '../logic/io';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return safeParseJSON<Task[]>(saved).getOrElse([]);
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const updateTasks = useCallback((updater: (tasks: Task[]) => Task[]) => {
    setTasks(updater);
  }, []);

  const addTask = useCallback((title: string, priority: Priority) => {

    const id = uuidv4();
    const createdAt = Date.now();
    const newTask = createTask(id, createdAt, title, priority);
    updateTasks(addTaskPure(newTask));
  }, [updateTasks]);

  const toggleTask = useCallback((id: string) => {
    updateTasks(toggleTaskPure(id));
  }, [updateTasks]);

  const deleteTask = useCallback((id: string) => {
    updateTasks(deleteTaskPure(id));
  }, [updateTasks]);


  const updateTaskPriority = useCallback((id: string, priority: Priority) => {
    updateTasks(updateTaskPriorityPure(id, priority));
  }, [updateTasks]);

  const clearCompleted = useCallback(() => {
    updateTasks(clearCompletedPure);
  }, [updateTasks]);


  const startEditing = useCallback((id: string) => {
    setEditingId(id);
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingId(null);
  }, []);

  const saveEditing = useCallback((id: string, newTitle: string) => {
    if (newTitle.trim()) {
      updateTasks(updateTaskTitlePure(id, newTitle.trim()));
    }
    setEditingId(null);
  }, [updateTasks]);

  return {
    tasks,
    editingId,
    addTask,
    toggleTask,
    deleteTask,
    updateTaskPriority,
    clearCompleted,
    startEditing,
    cancelEditing,
    saveEditing
  };
};
