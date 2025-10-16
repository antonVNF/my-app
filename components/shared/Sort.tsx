'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProductFilterStore } from './store/useProductFilterStore';

const sortOptions = [
  { value: 'default', label: 'Default sorting' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export function SortSelect() {
  const { sort, setSort } = useProductFilterStore();

  return (
    <Select value={sort} onValueChange={setSort}>
      <SelectTrigger className="w-[220px] justify-between">
        <span className="text-sm text-gray-600">Sort by:</span>
        <SelectValue placeholder="Select sorting" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
