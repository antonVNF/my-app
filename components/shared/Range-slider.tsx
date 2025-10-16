'use client';
import React from 'react';
import { Title } from '@/components/shared/title';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useProductFilterStore } from './store/useProductFilterStore';
const RangeSlider = () => {
  const { priceRange, setPriceRange } = useProductFilterStore();
  return (
    <div className={'pr-7'}>
      <Title size={'xs'} text="Price Range" className={'font-bold mb-4'} />
      <div className={'pl-4'}>
        <Slider
          onValueChange={setPriceRange}
          value={priceRange}
          min={39}
          max={1230}
          step={1}
          className={cn('')}
        />
        <div className={'mt-4'}>
          <span>Price:</span>{' '}
          <span className={'text-primary'}>
            {priceRange[0]}$ - {priceRange[1]}$
          </span>
        </div>
        <Button className={'w-[90px] mt-3 cursor-pointer'}>Filter</Button>
      </div>
    </div>
  );
};

export default RangeSlider;
