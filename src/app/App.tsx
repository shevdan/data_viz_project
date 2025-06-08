import './index.css';

import type { JSX } from 'react';
import { useMemo, useState } from 'react';

import { Map } from '~/entities/map';
import {
  Statistic,
  type StatisticFilterType,
  studentsData,
} from '~/entities/student';
import { StatisticFilter } from '~/features/statisticFilter';
import {
  applyFilters,
  DEFAULT_FILTERS,
  type FilterConfig,
  FiltersPanel,
  type FilterType,
} from '~/features/studentFilters';

export function App(): JSX.Element {
  const [panelFilters, setPanelFilters] =
    useState<FilterConfig>(DEFAULT_FILTERS);

  const [statisticFilter, setStatisticFilter] =
    useState<StatisticFilterType>('score');

  const processedData = useMemo(() => {
    return applyFilters(studentsData, panelFilters);
  }, [panelFilters]);

  const handleFilterChange = (filterType: FilterType, value: string) => {
    setPanelFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 mx-auto bg-gray-100/20">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        Аналіз даних вступників по регіонах
      </h1>

      <p className="font-medium">
        Дані взяті з{' '}
        <a
          href="https://info.edbo.gov.ua/"
          className="mb-6 sm:mb-8 underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          ЄДЕБО
        </a>
      </p>

      <p className="text-base sm:text-1xl mb-6 sm:mb-8 text-center max-w-2xl">
        На цьому графіку ви можете побачити розподіл вступників по областям за
        вступним балом, віком та кількістю за різноманітними фільтрами
      </p>

      <div className="w-full flex flex-col justify-center lg:flex-row lg:gap-6">
        <div className="w-full lg:w-auto flex flex-col gap-4 sm:gap-6 mb-6 lg:mb-0">
          <FiltersPanel
            filters={panelFilters}
            onFilterChange={handleFilterChange}
          />

          <div className="hidden lg:block">
            <StatisticFilter
              value={statisticFilter}
              onFilterChange={(value) => setStatisticFilter(value)}
            />
          </div>
        </div>

        <div className="hidden lg:block">
          <Statistic regionStats={processedData} filter={statisticFilter} />
        </div>
      </div>

      <Map regionStats={processedData} statisticFilter={statisticFilter} />

      <div className="w-full lg:hidden flex flex-col gap-4">
        <StatisticFilter
          value={statisticFilter}
          onFilterChange={(value) => setStatisticFilter(value)}
        />
        <Statistic regionStats={processedData} filter={statisticFilter} />
      </div>
    </div>
  );
}
