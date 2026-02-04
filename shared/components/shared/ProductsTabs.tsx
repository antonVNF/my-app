'use client';

import { cn } from '@/shared/lib/utils';
import { useProductFilterStore } from '../../store/useProductFilterStore';

const tabs = ['All Plants', 'New Arrivals', 'Sale'];

export function ProductsTabs() {
  const { activeTab, setTab } = useProductFilterStore();
  return (
    <div className="bg-transparent">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setTab(tab)}
          className={cn(
            'rounded-none px-2 transition-all mr-9 hover:text-primary',
            activeTab === tab ? 'text-primary border-b-2 pb-0.5 border-primary' : '',
          )}>
          {tab}
        </button>
      ))}
    </div>
  );
}
