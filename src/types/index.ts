import { categories } from '../mocks/categories';
import { products } from '../mocks/products';

export type Product = (typeof products)[number];

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Category = typeof categories[number];
