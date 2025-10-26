'use client';
import React from 'react';
import { Title } from '@/components/shared/title';
import { cn } from '@/lib/utils';
import { useProductFilterStore } from './store/useProductFilterStore';
import { categories } from '@/prisma/constants';

const Categories = () => {
  const { activeCategory, setCategory } = useProductFilterStore();
  return (
    <div className={'mb-8'}>
      <Title size={'xs'} text="Categories" className={'font-bold mb-4'} />
      {categories.map((c, i) => {
        return (
          <h5
            onClick={() => setCategory(i + 1 === activeCategory ? 0 : i + 1)}
            className={cn(
              'text-sm pb-3 pl-5 pr-6 cursor-pointer hover:text-primary transition-colors',
              i + 1 === activeCategory ? 'text-primary' : '',
            )}
            key={c.name}>
            {c.name}
          </h5>
        );
      })}
    </div>
  );
};

export default Categories;
