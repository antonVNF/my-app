import React from 'react';
import ProductsList from "@/components/shared/ProductList";
import { ProductsFilterBar } from './TopBar';
const ProductsPage = () => {
    return (
        <div className={"w-[838px] ml-14"} >
            <ProductsFilterBar/>
            <ProductsList/>
        </div>
    );
};

export default ProductsPage;
