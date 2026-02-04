import React from 'react';
import Product from '@/shared/components/shared/Product';
import { prisma } from '@/prisma/prisma-client';

const ProductsList = async () => {
  const products = await prisma.product.findMany({
    take: 9,
  });
  return (
    <div className={'grid grid-cols-3 gap-x-8 gap-y-6'}>
      {products.map((p) => {
        return <Product key={p.id} {...p} />;
      })}
    </div>
  );
};

export default React.memo(ProductsList);
