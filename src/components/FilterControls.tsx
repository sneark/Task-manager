import React from 'react';
import type { FilterType, SortType } from '../logic/todoFunctions';

interface FilterControlsProps {
    currentFilter: FilterType;
    currentSort: SortType;
    onFilterChange: (filter: FilterType) => void;
    onSortChange: (sort: SortType) => void;
    onClearCompleted: () => void;
    itemsLeft: number;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
    currentFilter,
    currentSort,
    onFilterChange,
    onSortChange,
    onClearCompleted,
    itemsLeft,
}) => {
    const filters: FilterType[] = ['all', 'active', 'completed'];

    const filterLabels: Record<FilterType, string> = {
        all: 'Wszystkie',
        active: 'Aktywne',
        completed: 'Zakończone',
    };

    return (
        <div className="filter-controls-container">
            <div className="filter-controls">
                <span className="items-count">{itemsLeft} do zrobienia</span>
                <div className="filters">
                    {filters.map((f) => (
                        <button
                            key={f}
                            className={`btn-filter ${currentFilter === f ? 'active' : ''}`}
                            onClick={() => onFilterChange(f)}
                        >
                            {filterLabels[f]}
                        </button>
                    ))}
                </div>
            </div>

            <div className="secondary-controls">
                <div className="sort-controls">
                    <span>Sortuj: </span>
                    <select
                        value={currentSort}
                        onChange={(e) => onSortChange(e.target.value as SortType)}
                        className="sort-select"
                    >
                        <option value="date">Data stworzenia</option>
                        <option value="priority">Priorytet</option>
                    </select>
                </div>
                <button className="btn-clear" onClick={onClearCompleted}>
                    Wyczyść zakończone
                </button>
            </div>
        </div>
    );
};
