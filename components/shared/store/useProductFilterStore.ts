import { create } from 'zustand';

interface ProductFilterState {
  activeCategory: number;
  activeTab: string;
  sort: string;
  priceRange: [number, number];
  size: number;

  setCategory: (id: number) => void;
  setTab: (tab: string) => void;
  setSort: (value: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSize: (size: number) => void;
}

export const useProductFilterStore = create<ProductFilterState>((set) => ({
  activeCategory: 0,
  activeTab: 'All Plants',
  sort: 'default',
  priceRange: [39, 1230],
  size: 0,

  setCategory: (id) => set({ activeCategory: id }),
  setTab: (tab) => set({ activeTab: tab }),
  setSort: (value) => set({ sort: value }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSize: (size) => set({ size }),
}));
