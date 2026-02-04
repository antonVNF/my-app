import { Product } from '@prisma/client';
import { AxiosInstance } from './instanse';
import { SEARCH_PRODUCTS } from './constants';
export const search = async (query: string): Promise<Product[]> => {
  return (await AxiosInstance.get<Product[]>(SEARCH_PRODUCTS, { params: { query } })).data;
};
