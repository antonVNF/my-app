'use client';
import { useClickOutside, useDebounceValue } from '@siberiacancode/reactuse';
import { cn } from '@/shared/lib/utils';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Api } from '@/shared/services/api-client';
import { Product } from '@prisma/client';

interface Props {
  setIsOpen: (value: boolean) => void;
}

const SearchInput = ({ setIsOpen }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const debounceQuery = useDebounceValue(query, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const click = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const handleClose = useCallback(() => {
    setQuery('');
    setIsOpen(false);
    setProducts([]);
  }, [setIsOpen]);

  const handleClearInput = useCallback(() => {
    setQuery('');
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose],
  );

  useEffect(() => {
    let isMounted = true;

    const searchProducts: () => void = async () => {
      if (!isMounted) return;

      if (!debounceQuery.trim()) {
        setProducts([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const items = await Api.products.search(debounceQuery);
        if (isMounted) {
          setProducts(items);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Search error:', error);
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    searchProducts();

    return () => {
      isMounted = false;
    };
  }, [debounceQuery]);

  return (
    <div className={cn('fixed bg-black/90 w-full h-screen left-0 top-0 z-20')}>
      <div ref={click} className="absolute w-full flex flex-col items-center justify-start pt-20">
        <div className="w-3/5 max-w-2xl relative">
          <input
            className="bg-white px-4 py-4 w-full rounded-2xl transition-all outline-0 pr-12 text-lg"
            ref={ref}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search products..."
            autoFocus
            role="searchbox"
            aria-label="Search products"
          />
          {query && (
            <button
              onClick={handleClearInput}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Clear search">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

        {(isLoading || products.length > 0 || (debounceQuery.trim() && !isLoading)) && (
          <div
            className={cn(
              'mt-3 w-3/5 max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden',
              'transition-all duration-300 ease-out transform origin-top',
            )}>
            {isLoading ? (
              <div className="p-4 text-center text-gray-500" role="status" aria-live="polite">
                Searching products...
              </div>
            ) : products.length > 0 ? (
              products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  onClick={handleClose}>
                  {product.imageUrl && (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="object-cover rounded"
                    />
                  )}
                  <span className="text-gray-800 font-medium">{product.name}</span>
                </Link>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500" role="status" aria-live="polite">
                No products found for &quot;{debounceQuery}&quot;
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
