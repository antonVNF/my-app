'use client';
import React, { useEffect, useState } from 'react';
import { Title } from '@/components/shared/title';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useProductFilterStore } from './store/useProductFilterStore';
import { useDebounceValue } from '@siberiacancode/reactuse';

const RangeSlider = () => {
  const { priceRange, setPriceRange } = useProductFilterStore();
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);
  const debouncePrice = useDebounceValue(localPriceRange, 200);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  useEffect(() => {
    if (debouncePrice[0] !== priceRange[0] || debouncePrice[1] !== priceRange[1]) {
      setPriceRange(debouncePrice);
    }
  }, [debouncePrice, setPriceRange, priceRange]);

  const onValueChange = (value: [number, number]) => {
    setLocalPriceRange(value);
  };
  
  return (
    <div className={'pr-7'}>
      <Title size={'xs'} text="Price Range" className={'font-bold mb-4'} />
      <div className={'pl-4'}>
        <Slider
          onValueChange={onValueChange}
          value={localPriceRange}
          min={39}
          max={1230}
          step={1}
          className={cn('')}
        />
        <div className={'mt-4'}>
          <span>Price:</span>{' '}
          <span className={'text-primary'}>
            {localPriceRange[0]}$ - {localPriceRange[1]}$
          </span>
        </div>
        <Button className={'w-[90px] mt-3 cursor-pointer'}>Filter</Button>
      </div>
    </div>
  );
};

export default RangeSlider;
