import { useState, useMemo } from 'react';
import './App.css';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { FilterControls } from './components/FilterControls';
import { useTasks } from './hooks/useTasks';
import { processTasks } from './logic/todoFunctions';
import type { FilterType, SortType } from './logic/todoFunctions';

function App() {
  const {
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
  } = useTasks();

  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('date');

  const visibleTasks = useMemo(() => {
    return processTasks(tasks, filter, sort);
  }, [tasks, filter, sort]);

  const activeCount = useMemo(() => tasks.filter(t => !t.completed).length, [tasks]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Lista Zadań</h1>
      </header>

      <main className="todo-card">
        <TaskInput onAdd={addTask} />

        <FilterControls
          currentFilter={filter}
          currentSort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onClearCompleted={clearCompleted}
          itemsLeft={activeCount}
        />

        <TaskList
          tasks={visibleTasks}
          editingId={editingId}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdatePriority={updateTaskPriority}
          onEditStart={startEditing}
          onEditCancel={cancelEditing}
          onEditSave={saveEditing}
        />
      </main>
    </div>
  );
}

export default App;
