import React from 'react';
import Product, { Plant } from '@/components/shared/Product';

export const mockPlants: Plant[] = [
  {
    id: 'p1',
    name: 'Monstera Deliciosa',
    category: 1,
    price: 39.99,
    imageUrl: 'https://placehold.co/100x100',
    description:
      'A beautiful tropical plant with iconic split leaves. Perfect for indoor decoration.',
    isNew: true,
  },
  {
    id: 'p2',
    name: 'Snake Plant',
    category: 1,
    price: 19.99,
    discountPercent: 20,
    imageUrl: 'https://placehold.co/100x100',
    description: 'Low-maintenance plant that thrives in low light. Great air purifier.',
  },
  {
    id: 'p3',
    name: 'Aloe Vera',
    category: 2,
    price: 14.99,
    discountPercent: 15,
    imageUrl: 'https://placehold.co/100x100',
    description: 'A healing succulent plant known for its soothing gel. Easy to grow.',
  },
  {
    id: 'p4',
    name: 'Peace Lily',
    category: 3,
    price: 29.99,
    imageUrl: 'https://placehold.co/100x100',
    description: 'Elegant plant with white blooms. Prefers shaded areas indoors.',
  },
  {
    id: 'p5',
    name: 'Cactus',
    category: 2,
    price: 12.99,
    discountPercent: 10,
    imageUrl: 'https://placehold.co/100x100',
    description: 'A hardy desert plant that requires minimal care. Perfect for sunny windowsills.',
  },
  {
    id: 'p6',
    name: 'Monstera Deliciosa',
    category: 1,
    price: 39.99,
    imageUrl: 'https://placehold.co/100x100',
    description:
      'A beautiful tropical plant with iconic split leaves. Perfect for indoor decoration.',
    isNew: true,
  },
  {
    id: 'p7',
    name: 'Snake Plant',
    category: 1,
    price: 19.99,
    discountPercent: 20,
    imageUrl: 'https://placehold.co/100x100',
    description: 'Low-maintenance plant that thrives in low light. Great air purifier.',
  },
  {
    id: 'p8',
    name: 'Aloe Vera',
    category: 2,
    price: 14.99,
    discountPercent: 15,
    imageUrl: 'https://placehold.co/100x100',
    description: 'A healing succulent plant known for its soothing gel. Easy to grow.',
  },
  {
    id: 'p9',
    name: 'Peace Lily',
    category: 3,
    price: 29.99,
    imageUrl: 'https://placehold.co/100x100',
    description: 'Elegant plant with white blooms. Prefers shaded areas indoors.',
  },
];

const ProductsList = () => {
  return (
    <div className={'grid grid-cols-3 gap-x-8 gap-y-6'}>
      {mockPlants.map((p) => {
        return <Product key={p.id} {...p} />;
      })}
    </div>
  );
};

export default ProductsList;
