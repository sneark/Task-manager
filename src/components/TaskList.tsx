import React, { useState } from 'react';
import type { Task, Priority } from '../logic/todoFunctions';

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdateTitle: (id: string, newTitle: string) => void;
    onUpdatePriority: (id: string, priority: Priority) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onToggle,
    onDelete,
    onUpdateTitle,
    onUpdatePriority
}) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    if (tasks.length === 0) {
        return <div className="empty-state">Brak zadań.</div>;
    }

    const startEditing = (task: Task) => {
        setEditingId(task.id);
        setEditValue(task.title);
    };

    const saveEdit = (id: string) => {
        if (editValue.trim()) {
            onUpdateTitle(id, editValue.trim());
        }
        setEditingId(null);
    };

    const priorityColors: Record<Priority, string> = {
        high: '#ff4d4f',
        medium: '#faad14',
        low: '#52c41a',
    };

    const priorityLabels: Record<Priority, string> = {
        high: 'Wysoki',
        medium: 'Średni',
        low: 'Niski',
    };

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <label className="checkbox-container">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggle(task.id)}
                        />
                        <span className="checkmark"></span>
                    </label>

                    <div className="task-content">
                        {editingId === task.id ? (
                            <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={() => saveEdit(task.id)}
                                onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
                                className="edit-input"
                                autoFocus
                            />
                        ) : (
                            <span
                                className="task-title"
                                onClick={() => onToggle(task.id)}
                                onDoubleClick={() => startEditing(task)}
                                title="Kliknij dwukrotnie, aby edytować"
                            >
                                {task.title}
                            </span>
                        )}

                        <select
                            value={task.priority}
                            onChange={(e) => onUpdatePriority(task.id, e.target.value as Priority)}
                            className="priority-badge-select"
                            style={{ borderColor: priorityColors[task.priority], color: priorityColors[task.priority] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {Object.entries(priorityLabels).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="btn-delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(task.id);
                        }}
                        aria-label="Usuń zadanie"
                    >
                        ×
                    </button>
                </li>
            ))}
        </ul>
    );
};
