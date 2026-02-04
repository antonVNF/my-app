import React from 'react';
import Container from '@/shared/components/shared/Сontainer';
import Filters from '@/shared/components/shared/Filters';
import ProductsPage from '@/shared/components/shared/ProductsPage';
import HomePageCarousel from './HomePageCarousel';

const MainPage = () => {
  return (
    <Container className="">
      <HomePageCarousel />
      <div className=" mt-12 flex justify-between">
        <Filters />
        <ProductsPage />
      </div>
    </Container>
  );
};

export default MainPage;
