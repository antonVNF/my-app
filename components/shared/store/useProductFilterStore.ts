'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductFilterState {
  activeCategory: number;
  activeTab: string;
  sort: string;
  priceRange: [number, number];
  size: number;
}

interface ProductFilterActions {
  setCategory: (id: number) => void;
  setTab: (tab: string) => void;
  setSort: (value: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSize: (size: number) => void;
}

export const initialState: ProductFilterState = {
  activeCategory: 0,
  activeTab: 'All Plants',
  sort: 'default',
  priceRange: [39, 1230],
  size: 0,
};

export const useProductFilterStore = create<ProductFilterState & ProductFilterActions>()(
  persist(
    (set) => ({
      ...initialState,
      setCategory: (id) => set({ activeCategory: id }),
      setTab: (tab) => set({ activeTab: tab }),
      setSort: (value) => set({ sort: value }),
      setPriceRange: (range) => set({ priceRange: range }),
      setSize: (size) => set({ size }),
      resetFilters: () => set(initialState),
    }),
    {
      name: 'product-filters',
      partialize: (state) => ({
        activeCategory: state.activeCategory,
        activeTab: state.activeTab,
        sort: state.sort,
        priceRange: state.priceRange,
        size: state.size,
      }),
    },
  ),
);

// export const useProductFilterData = () => {
//   return useProductFilterStore((state) => ({
//     activeCategory: state.activeCategory,
//     activeTab: state.activeTab,
//     sort: state.sort,
//     priceRange: state.priceRange,
//     size: state.size,
//   }));
// };
