import { create } from 'zustand';

type MapState = {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
};

export const useMapStore = create<MapState>((set) => ({
  selectedRegion: 'Івано-Франківська обл.',
  setSelectedRegion: (region) => set({ selectedRegion: region }),
}));
