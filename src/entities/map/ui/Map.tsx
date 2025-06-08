import type { JSX } from 'react';

import type { RegionColorKey, RegionStats } from '~/entities/map';
import type { StatisticFilterType } from '~/entities/student';

import { regions } from '../mapConfig';
import { useMapStore } from '../model/mapStore';
import { Region } from './Region';

type MapProps = {
  regionStats: RegionStats[];
  statisticFilter: StatisticFilterType;
};

export function Map({ regionStats, statisticFilter }: MapProps): JSX.Element {
  const { selectedRegion, setSelectedRegion } = useMapStore();

  const handleRegionClick = (region: string): void => {
    setSelectedRegion(region);
  };

  const regionList = regions.map(({ d, id, name }) => {
    const stats = regionStats.find((stat) => stat.region === name);
    const key = `${statisticFilter}Color` as RegionColorKey;
    const color = stats?.[key];
    const isSelected = selectedRegion === name;

    return (
      <Region
        key={id}
        id={id}
        d={d}
        name={name}
        color={color}
        isSelected={isSelected}
        onClick={handleRegionClick}
      />
    );
  });

  return (
    <svg
      width="800px"
      height="600px"
      className="max-w-[800px] max-h-[600px] w-full h-full"
      viewBox="0 0 800 600"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      {regionList}
    </svg>
  );
}
