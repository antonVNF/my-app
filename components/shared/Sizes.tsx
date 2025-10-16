'use client';
import React from 'react';
import { Title } from '@/components/shared/title';
import { cn } from '@/lib/utils';
import { useProductFilterStore } from './store/useProductFilterStore';
const SIZES = ['Small', 'Medium', 'Large'];

const Sizes = () => {
  const { size, setSize } = useProductFilterStore();
  return (
    <div>
      <Title size={'xs'} text="Sizes" className={'font-bold mt-6 mb-4'} />
      {SIZES.map((c, i) => {
        return (
          <h5
            className={cn(
              'text-sm pb-3 pl-5 pr-6 cursor-pointer hover:text-primary transition-colors',
              i + 1 === size ? 'text-primary' : '',
            )}
            key={c}
            onClick={() => setSize(i + 1 === size ? 0 : i + 1)}>
            {c}
          </h5>
        );
      })}
    </div>
  );
};

export default Sizes;
