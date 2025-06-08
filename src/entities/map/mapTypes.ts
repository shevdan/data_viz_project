export type RegionData = {
  id: number;
  name: string;
  d: string;
};

export type MapState = {
  activeRegion: number;
};

export type HeatmapColors = {
  BLUE: string;
  GREEN: string;
  YELLOW: string;
};

export type HeatmapColor = keyof HeatmapColors;

export type RegionStats = {
  region: string;
  avgScore: number;
  avgAge: number;
  count: number;
  scoreColor: string;
  ageColor: string;
  countColor: string;
  scoreP20: number;
  scoreP80: number;
  ageP20: number;
  ageP80: number;
};

export type RegionColorKey = 'scoreColor' | 'ageColor' | 'countColor';
