import { useState, useMemo, useEffect } from 'react';
import './App.css';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { FilterControls } from './components/FilterControls';
import {
  createTask,
  addTask,
  toggleTask,
  deleteTask,
  updateTaskTitle,
  updateTaskPriority,
  clearCompleted,
  processTasks,
} from './logic/todoFunctions';
import type { Task, FilterType, Priority, SortType } from './logic/todoFunctions';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('date');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    return processTasks(tasks, filter, sort);
  }, [tasks, filter, sort]);

  const activeCount = useMemo(() => tasks.filter(t => !t.completed).length, [tasks]);

  const handleAddTask = (title: string, priority: Priority) => {
    setTasks((prev) => addTask(prev, createTask(title, priority)));
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) => toggleTask(prev, id));
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => deleteTask(prev, id));
  };

  const handleUpdateTitle = (id: string, newTitle: string) => {
    setTasks((prev) => updateTaskTitle(prev, id, newTitle));
  };

  const handleUpdatePriority = (id: string, priority: Priority) => {
    setTasks((prev) => updateTaskPriority(prev, id, priority));
  };

  const handleClearCompleted = () => {
    setTasks((prev) => clearCompleted(prev));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Lista Zadań</h1>
      </header>

      <main className="todo-card">
        <TaskInput onAdd={handleAddTask} />

        <FilterControls
          currentFilter={filter}
          currentSort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onClearCompleted={handleClearCompleted}
          itemsLeft={activeCount}
        />

        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onUpdateTitle={handleUpdateTitle}
          onUpdatePriority={handleUpdatePriority}
        />
      </main>
    </div>
  );
}

export default App;
