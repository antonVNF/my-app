'use client';
import { useParams } from 'next/navigation';

const Product = () => {
  const {id} = useParams();
  return <div>{id}</div>;
};

export default Product;
