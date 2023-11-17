import { Company } from './company.model';

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  characteristics: string;
  price: number;
  company: Company;
  categories: Category;
  createdAt: Date;
}
