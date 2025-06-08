import type { HeatmapColor, HeatmapColors } from './mapTypes';

const MIN_INTENSITY = 0.2;
const MAX_INTENSITY = 1;

const HEATMAP_COLORS: HeatmapColors = {
  BLUE: 'rgba(0, 100, 255',
  GREEN: 'rgba(0, 200, 0',
  YELLOW: 'rgba(255, 200, 0',
};

export const generateNormalizedHeatmapColor = (
  value: number,
  minValue: number,
  maxValue: number,
  colorType: HeatmapColor,
): string => {
  if (maxValue === minValue) {
    const intensity = (MIN_INTENSITY + MAX_INTENSITY) / 2;
    const colorBase = HEATMAP_COLORS[colorType];
    return `${colorBase}, ${intensity})`;
  }

  const normalizedValue = (value - minValue) / (maxValue - minValue);

  const intensity =
    MIN_INTENSITY + normalizedValue * (MAX_INTENSITY - MIN_INTENSITY);

  const colorBase = HEATMAP_COLORS[colorType];
  return `${colorBase}, ${intensity})`;
};
