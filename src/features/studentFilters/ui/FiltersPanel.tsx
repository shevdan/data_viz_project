import type { JSX } from 'react';

import type { FilterConfig, FilterType } from '../studentFiltersTypes';

type FiltersPanelProps = {
  filters: FilterConfig;
  onFilterChange: (filterType: FilterType, value: string) => void;
};

export function FiltersPanel({
  filters,
  onFilterChange,
}: FiltersPanelProps): JSX.Element {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Фільтри</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Фільтр по статі */}
        <div>
          <label className="block text-sm font-medium mb-2">Стать:</label>
          <select
            value={filters.gender}
            onChange={(e) => onFilterChange('gender', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="all">Всі</option>
            <option value="male">Чоловіки</option>
            <option value="female">Жінки</option>
          </select>
        </div>

        {/* Фільтр по бюджету */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Фінансування:
          </label>
          <select
            value={filters.budget}
            onChange={(e) => onFilterChange('budget', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="all">Всі</option>
            <option value="budget">Бюджет</option>
            <option value="contract">Контракт</option>
          </select>
        </div>

        {/* Фільтр по освітньому ступеню */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Освітній ступінь:
          </label>
          <select
            value={filters.degree}
            onChange={(e) => onFilterChange('degree', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="all">Всі</option>
            <option value="Бакалавр">Бакалавр</option>
            <option value="Магістр">Магістр</option>
            <option value="Фаховий молодший бакалавр">
              Фаховий молодший бакалавр
            </option>
          </select>
        </div>

        {/* Фільтр по віку */}
        <div>
          <label className="block text-sm font-medium mb-2">Вік:</label>
          <select
            value={filters.age}
            onChange={(e) => onFilterChange('age', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="all">Всі</option>
            <option value="young">До 25 років</option>
            <option value="old">25+ років</option>
          </select>
        </div>
      </div>
    </div>
  );
}
