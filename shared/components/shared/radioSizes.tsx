'use client';
import { useState, useEffect, useMemo } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { cn } from '@/shared/lib/utils';

// Порядок размеров, который вы хотите
const SIZE_ORDER = ['SMALL', 'MEDIUM', 'LARGE'];
const SIZE_LABELS: Record<string, string> = {
  SMALL: 'S',
  MEDIUM: 'M',
  LARGE: 'L',
};

interface IProps {
  sizes: [string, boolean][];
}

const RadioSizes = ({ sizes }: IProps) => {
  // Сортируем размеры по заданному порядку
  const sortedSizes = useMemo(() => {
    return [...sizes].sort((a, b) => {
      return SIZE_ORDER.indexOf(a[0]) - SIZE_ORDER.indexOf(b[0]);
    });
  }, [sizes]);

  // Находим первый доступный размер как значение по умолчанию
  const defaultSize = sortedSizes.find((size) => size[1])?.[0] || '';

  const [selectedSize, setSelectedSize] = useState(defaultSize);

  useEffect(() => {
    if (!sortedSizes.some((size) => size[0] === selectedSize && size[1])) {
      const newDefault = sortedSizes.find((size) => size[1])?.[0] || '';
      setSelectedSize(newDefault);
    }
  }, [sortedSizes, selectedSize]);

  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
  };

  return (
    <RadioGroup value={selectedSize} onValueChange={handleSizeChange} className="flex mt-3 gap-3">
      {sortedSizes.map(([sizeName, isAvailable]) => (
        <div
          key={sizeName}
          className={cn(
            'flex items-center gap-3 mb-2 relative justify-center',
            !isAvailable && 'opacity-50 cursor-not-allowed',
          )}>
          <RadioGroupItem
            disabled={!isAvailable}
            className={cn(
              'h-7 w-7 text-chart-1 transition-all delay-100',
              selectedSize === sizeName ? 'border-primary border-2' : '',
              !isAvailable && 'cursor-not-allowed',
            )}
            value={sizeName}
            id={`size-${sizeName}`}
          />
          <Label
            htmlFor={`size-${sizeName}`}
            className={cn(
              'cursor-pointer absolute font-bold text-muted-foreground text-[18px] transition-all delay-100',
              selectedSize === sizeName ? 'text-primary' : '',
              !isAvailable && 'cursor-not-allowed text-muted-foreground',
            )}>
            {SIZE_LABELS[sizeName] || sizeName.charAt(0)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default RadioSizes;
