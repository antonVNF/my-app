
'use client';
import React, { useEffect, useCallback } from 'react';
import Categories from '@/components/shared/Categories';
import RangeSlider from '@/components/shared/Range-slider';
import Sizes from '@/components/shared/Sizes';
import Link from 'next/link';
import Image from 'next/image';
import { useProductFilterStore } from './store/useProductFilterStore';
import qs from 'qs';
import { useRouter} from 'next/navigation';
import { initialState } from './store/useProductFilterStore';

interface QueryParams {
  activeCategory?: number;
  activeTab?: string;
  sort?: string;
  priceFrom?: number;
  priceTo?: number;
  size?: number;
}

const Filters = () => {
  const router = useRouter();
  const { activeCategory, activeTab, sort, priceRange, size } = useProductFilterStore();

  const buildQueryString = useCallback(() => {
    const queryParams: QueryParams = {};

    if (activeCategory !== initialState.activeCategory) {
      queryParams.activeCategory = activeCategory;
    }
    if (activeTab !== initialState.activeTab) {
      queryParams.activeTab = activeTab;
    }
    if (sort !== initialState.sort) {
      queryParams.sort = sort;
    }
    if (priceRange[0] !== initialState.priceRange[0]) {
      queryParams.priceFrom = priceRange[0];
    }
    if (priceRange[1] !== initialState.priceRange[1]) {
      queryParams.priceTo = priceRange[1];
    }
    if (size !== initialState.size) {
      queryParams.size = size;
    }

    return qs.stringify(queryParams, { addQueryPrefix: true });
  }, [activeCategory, activeTab, sort, priceRange, size]);

  useEffect(() => {
    const queryString = buildQueryString();
    const hasParams = Object.keys(qs.parse(queryString)).length > 0;
    if (!hasParams || queryString === '?') {
      router.replace(window.location.pathname);
    } else {
      router.replace(queryString);
    }
  }, [buildQueryString, router]);

  return (
      <div className="w-[310px]">
        <div className="bg-sidebar-ring pl-4 pt-3.5 pr-6 pb-4.5">
          <Categories />
          <RangeSlider />
          <Sizes />
        </div>
        <div className="relative w-full h-[470px]">
          <Link href="/">
            <Image
                src="/discount-plant.jpg"
                alt="discount plants"
                fill
                className="object-cover"
                priority={false}
            />
          </Link>
        </div>
      </div>
  );
};

export default Filters;