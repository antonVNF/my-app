'use client';

import { ProductsTabs } from './ProductsTabs';
import { SortSelect } from './Sort';

export function ProductsFilterBar() {
  return (
    <div className="flex justify-between items-center w-full mb-6">
      <ProductsTabs />
      <SortSelect />
    </div>
  );
}
