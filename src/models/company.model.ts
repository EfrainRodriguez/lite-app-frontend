import { Product } from './product.model';

export interface Company {
  id: number;
  nit: string;
  name: string;
  address: string;
  phone: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}
