'use client';
import { Product } from '@prisma/client';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { Search } from 'lucide-react';

const ProductClient = ({ product }: { product: Product }) => {
  const [activeImage, setActiveImage] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));

    setZoomPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
  };

  const allImages = [product.imageUrl, ...product.thumbnailUrl];

  return (
    <div className="flex gap-7 items-center">
      <div className="gap-4 flex flex-col">
        {allImages.slice(0, 4).map((url, index) => (
          <Image
            key={index}
            width={100}
            height={100}
            src={url}
            alt={`${product.name} thumbnail ${index + 1}`}
            className={`cursor-pointer bg-muted ${
              index === activeImage ? 'border border-primary' : ''
            }`}
            onClick={() => setActiveImage(index)}
          />
        ))}
      </div>

      <div
        ref={imageRef}
        className="bg-muted relative overflow-hidden cursor-zoom-in reletive"
        style={{ width: 444, height: 444 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}>
        <Image
          width={444}
          height={444}
          src={allImages[activeImage]}
          alt={product.name}
          style={{
            transform: isZoomed ? 'scale(1.8)' : 'scale(1)',
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            transition: 'transform 0.3s ease',
          }}
        />
        {!isZoomed && (
          <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg z-20">
            <Search size={20} className="text-gray-800" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductClient;
