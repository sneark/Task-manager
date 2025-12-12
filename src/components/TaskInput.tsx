import React, { useState } from 'react';
import type { Priority } from '../logic/todoFunctions';

interface TaskInputProps {
    onAdd: (title: string, priority: Priority) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
    const [value, setValue] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim()) return;
        onAdd(value.trim(), priority);
        setValue('');
        setPriority('medium');
    };

    const priorityLabels: Record<Priority, string> = {
        low: 'Niski',
        medium: 'Średni',
        high: 'Wysoki',
    };

    return (
        <form onSubmit={handleSubmit} className="task-input-form">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Co jest do zrobienia?"
                className="task-input"
                autoFocus
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="priority-select"
            >
                {Object.entries(priorityLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                        {label}
                    </option>
                ))}
            </select>
            <button type="submit" className="btn-add">
                Dodaj
            </button>
        </form>
    );
};
