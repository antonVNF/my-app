'use client';
import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '../ui';
import Slide from './Slide';
import { cn } from '@/lib/utils';

const HomePageCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="mx-auto max-w-full py-4 relative">
      <Carousel setApi={setApi} className="w-full max-w-full">
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <Slide />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center justify-center gap-2 absolute left-1/2 bottom-7">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn('h-2 w-2 rounded-full', {
              'bg-primary border-primary': current === index,
              'bg-muted border-muted': current !== index,
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePageCarousel;
