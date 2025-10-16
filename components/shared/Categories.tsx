'use client';
import React from 'react';
import { Title } from '@/components/shared/title';
import { cn } from '@/lib/utils';
import { useProductFilterStore } from './store/useProductFilterStore';
const CATEGORIES = [
  'House Plants',
  'Potter Plants',
  'Seeds',
  'Small Plants',
  'Big Plants',
  'Succulents',
  'Trerrariums',
  'Gardening',
  'Accessories',
];

const Categories = () => {
  const { activeCategory, setCategory } = useProductFilterStore();
  return (
    <div className={'mb-8'}>
      <Title size={'xs'} text="Categories" className={'font-bold mb-4'} />
      {CATEGORIES.map((c, i) => {
        return (
          <h5
            onClick={() => setCategory(i + 1 === activeCategory ? 0 : i + 1)}
            className={cn(
              'text-sm pb-3 pl-5 pr-6 cursor-pointer hover:text-primary transition-colors',
              i + 1 === activeCategory ? 'text-primary' : '',
            )}
            key={c}>
            {c}
          </h5>
        );
      })}
    </div>
  );
};

export default Categories;
