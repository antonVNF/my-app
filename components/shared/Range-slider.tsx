'use client';
import React, { useState } from 'react';
import { Title } from '@/components/shared/title';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
const RangeSlider = () => {
  const [localValue, setLocalRange] = useState([39, 1230]);
  return (
    <div className={'pr-7'}>
      <Title size={'xs'} text="Price Range" className={'font-bold mb-4'} />
      <div className={'pl-4'}>
        <Slider
          onValueChange={setLocalRange}
          value={localValue}
          min={39}
          max={1230}
          step={1}
          className={cn('')}
        />
        <div className={'mt-4'}>
          <span>Price:</span>{' '}
          <span className={'text-primary'}>
            {localValue[0]}$ - {localValue[1]}$
          </span>
        </div>
        <Button className={'w-[90px] mt-3 cursor-pointer'}>Filter</Button>
      </div>
    </div>
  );
};

export default RangeSlider;
