import type { JSX } from 'react';

import type { StatisticFilterType } from '~/entities/student';

type StatisticFilterProps = {
  value: StatisticFilterType;
  onFilterChange: (value: StatisticFilterType) => void;
};

export function StatisticFilter({
  value,
  onFilterChange,
}: StatisticFilterProps): JSX.Element {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Середнє значення за</h2>
      <div className="w-full">
        <select
          value={value}
          onChange={(e) =>
            onFilterChange(e.target.value as StatisticFilterType)
          }
          className="w-full p-2 border rounded"
        >
          <option value="score">Конкурсний бал</option>
          <option value="age">Вік</option>
          <option value="count">Кількість вступників</option>
        </select>
      </div>
    </div>
  );
}
