import React, { useState, useEffect } from 'react';
import type { Task, Priority } from '../logic/todoFunctions';

interface TaskListProps {
    tasks: Task[];
    editingId: string | null;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdatePriority: (id: string, priority: Priority) => void;
    onEditStart: (id: string) => void;
    onEditCancel: () => void;
    onEditSave: (id: string, newTitle: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    editingId,
    onToggle,
    onDelete,
    onUpdatePriority,
    onEditStart,
    onEditCancel,
    onEditSave
}) => {
    const [tempValue, setTempValue] = useState('');


    useEffect(() => {
        if (editingId) {
            const task = tasks.find(t => t.id === editingId);
            if (task) {
                setTempValue(task.title);
            }
        }
    }, [editingId, tasks]);

    if (tasks.length === 0) {
        return <div className="empty-state">Brak zadań.</div>;
    }

    const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
        if (e.key === 'Enter') {
            onEditSave(id, tempValue);
        } else if (e.key === 'Escape') {
            onEditCancel();
        }
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
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                onBlur={() => onEditSave(task.id, tempValue)}
                                onKeyDown={(e) => handleKeyDown(e, task.id)}
                                className="edit-input"
                                autoFocus
                            />
                        ) : (
                            <span
                                className="task-title"
                                onClick={() => onToggle(task.id)}
                                onDoubleClick={() => onEditStart(task.id)}
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
