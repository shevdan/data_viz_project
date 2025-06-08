import type { JSX } from 'react';

import { type RegionStats, useMapStore } from '~/entities/map';

import type { StatisticFilterType } from '../studentTypes';

type StatisticProps = {
  regionStats: RegionStats[];
  filter: StatisticFilterType;
};

export function Statistic({
  regionStats,
  filter,
}: StatisticProps): JSX.Element {
  const { selectedRegion } = useMapStore();
  const regionStat = regionStats.find((stat) => stat.region === selectedRegion);

  return (
    <div className="w-full min-w-2xs bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Статистика</h2>
      {regionStat ? (
        <div className="space-y-4">
          <h3 className="text-md font-medium text-gray-600">
            {regionStat.region}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {filter === 'score' && (
              <>
                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-sm text-gray-600">
                    Середній конкурсний бал
                  </div>
                  <div className="text-lg font-semibold text-blue-700">
                    {regionStat.avgScore}
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-sm text-gray-600">
                    Перцентилі конкурсного балу
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <div className="text-xs text-gray-500">
                        20-й перцентиль
                      </div>
                      <div className="text-md font-semibold text-blue-600">
                        {regionStat.scoreP20}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">
                        80-й перцентиль
                      </div>
                      <div className="text-md font-semibold text-blue-600">
                        {regionStat.scoreP80}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {filter === 'age' && (
              <>
                <div className="bg-green-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Середній вік</div>
                  <div className="text-lg font-semibold text-green-700">
                    {regionStat.avgAge} років
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Перцентилі віку</div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <div className="text-xs text-gray-500">
                        20-й перцентиль
                      </div>
                      <div className="text-md font-semibold text-green-600">
                        {regionStat.ageP20} років
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">
                        80-й перцентиль
                      </div>
                      <div className="text-md font-semibold text-green-600">
                        {regionStat.ageP80} років
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {filter === 'count' && (
              <div className="bg-yellow-50 p-3 rounded">
                <div className="text-sm text-gray-600">
                  Кількість вступників
                </div>
                <div className="text-lg font-semibold text-yellow-700">
                  {regionStat.count}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-center py-4 sm:py-8">
          Клікніть на регіон на мапі для перегляду статистики
        </div>
      )}
    </div>
  );
}
