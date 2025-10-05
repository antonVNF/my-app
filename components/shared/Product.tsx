'use client';

import React from 'react';
import Image from 'next/image';
import { Title } from '@/components/shared/title';
import { ShoppingCart, Heart, Search } from 'lucide-react';

export type Plant = {
  id: string;
  name: string;
  category: number;
  price: number;
  discountPercent?: number;
  imageUrl: string;
  description: string;
  isNew?: boolean;
};

function getOldPrice(price: number, discountPercent?: number) {
  if (!discountPercent) return null;
  return (price / (1 - discountPercent / 100)).toFixed(2);
}

const Product = ({
  id,
  name,
  category,
  price,
  discountPercent,
  imageUrl,
  description,
  isNew,
}: Plant) => {
  const oldPrice = getOldPrice(price, discountPercent);

  return (
    <div className="relative w-[258px] transition-all border-t border-transparent hover:border-primary overflow-hidden">
      {(isNew || discountPercent) && (
        <div className="absolute top-3 left-0 flex flex-col gap-2 z-10">
          {discountPercent && (
            <span className="bg-primary text-white font-semibold px-2 py-1">
              -{discountPercent}% OFF
            </span>
          )}
        </div>
      )}

      <div className="w-[258px] h-[299px] relative mb-3 overflow-hidden bg-gray-100 group">
        <Image
          unoptimized
          src={imageUrl}
          alt={name}
          fill
          className="flex justify-center items-center object-cover object-center transition-transform"
        />
        <div className="bottom-2  flex justify-center gap-2 translate-x-1/2 translate-y-11 group-hover:translate-y-0 absolute transition-all duration-300">
          <button className="size-[35px] flex items-center justify-center bg-white rounded hover:text-primary transition-colors">
            <ShoppingCart size={18} />
          </button>
          <button className="size-[35px] flex items-center justify-center bg-white rounded hover:text-primary transition-colors">
            <Heart size={18} />
          </button>
          <button className="size-[35px] flex items-center justify-center bg-white rounded hover:text-primary transition-colors">
            <Search size={18} />
          </button>
        </div>
      </div>

      <Title text={name} size="xs" className="mb-1.5 leading-[16px]" />

      <div className="flex items-center gap-2">
        <span className="text-primary font-bold leading-[16px]">${price.toFixed(2)}</span>
        {oldPrice && (
          <span className="text-gray-400 font-bold line-through leading-[16px]">${oldPrice}</span>
        )}
      </div>
    </div>
  );
};

export default Product;
