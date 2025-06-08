import * as aq from 'arquero';

import {
  generateNormalizedHeatmapColor,
  type RegionStats,
} from '~/entities/map';
import type { StudentRecord } from '~/entities/student';

import { parseNumericValue } from '../studentFiltersLib';
import type { FilterConfig } from '../studentFiltersTypes';

export const applyFilters = (
  data: StudentRecord[],
  filters: FilterConfig,
): RegionStats[] => {
  let table = aq.from(data);

  if (filters.gender !== 'all') {
    const genderValue = filters.gender === 'male' ? 'True' : 'False';
    table = table.filter(
      aq.escape((d: StudentRecord) => d.isMale === genderValue),
    );
  }

  if (filters.budget !== 'all') {
    const budgetValue = filters.budget === 'budget' ? 'True' : 'False';
    table = table.filter(
      aq.escape((d: StudentRecord) => d.isBudget === budgetValue),
    );
  }

  if (filters.degree !== 'all') {
    table = table.filter(
      aq.escape((d: StudentRecord) => d.educationLevel === filters.degree),
    );
  }

  if (filters.age !== 'all') {
    const ageValue = filters.age === 'old' ? 'True' : 'False';
    table = table.filter(
      aq.escape((d: StudentRecord) => d.isOlder24 === ageValue),
    );
  }

  const regionStats = table
    .groupby('region')
    .rollup({
      count: aq.op.count(),
      avgScore: aq.op.mean('examScore'),
      avgAge: aq.op.mean('ageAtEnrollment'),
      scoreP20: aq.op.quantile('examScore', 0.2),
      scoreP80: aq.op.quantile('examScore', 0.8),
      ageP20: aq.op.quantile('ageAtEnrollment', 0.2),
      ageP80: aq.op.quantile('ageAtEnrollment', 0.8),
    })
    .derive({
      avgScore: aq.escape((d: { avgScore: number }) =>
        parseNumericValue(d.avgScore),
      ),
      avgAge: aq.escape((d: { avgAge: number }) => parseNumericValue(d.avgAge)),
      scoreP20: aq.escape((d: { scoreP20: number }) =>
        parseNumericValue(d.scoreP20),
      ),
      scoreP80: aq.escape((d: { scoreP80: number }) =>
        parseNumericValue(d.scoreP80),
      ),
      ageP20: aq.escape((d: { ageP20: number }) => parseNumericValue(d.ageP20)),
      ageP80: aq.escape((d: { ageP80: number }) => parseNumericValue(d.ageP80)),
    })
    .orderby('region')
    .objects() as Omit<RegionStats, 'scoreColor' | 'ageColor' | 'countColor'>[];

  const scores = regionStats.map((stat) => stat.avgScore);
  const ages = regionStats.map((stat) => stat.avgAge);
  const counts = regionStats.map((stat) => stat.count);

  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);
  const minCount = Math.min(...counts);
  const maxCount = Math.max(...counts);

  const regionStatsWithColors: RegionStats[] = regionStats.map((stat) => ({
    ...stat,
    region: stat.region || 'Невідома область',
    avgScore: Number(stat.avgScore.toFixed(2)),
    avgAge: Number(stat.avgAge.toFixed(1)),
    scoreP20: Number(stat.scoreP20.toFixed(2)),
    scoreP80: Number(stat.scoreP80.toFixed(2)),
    ageP20: Number(stat.ageP20.toFixed(1)),
    ageP80: Number(stat.ageP80.toFixed(1)),
    scoreColor: generateNormalizedHeatmapColor(
      stat.avgScore,
      minScore,
      maxScore,
      'BLUE',
    ),
    ageColor: generateNormalizedHeatmapColor(
      stat.avgAge,
      minAge,
      maxAge,
      'GREEN',
    ),
    countColor: generateNormalizedHeatmapColor(
      stat.count,
      minCount,
      maxCount,
      'YELLOW',
    ),
  }));

  return regionStatsWithColors;
};
