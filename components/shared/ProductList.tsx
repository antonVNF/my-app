import React from 'react';
import Product from '@/components/shared/Product';
import { products } from '@/prisma/constants';



const ProductsList = () => {
  return (
    <div className={'grid grid-cols-3 gap-x-8 gap-y-6'}>
      {products.map((p) => {
        return <Product key={p.name} {...p} />;
      })}
    </div>
  );
};

export default React.memo(ProductsList);
