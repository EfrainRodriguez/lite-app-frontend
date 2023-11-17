import { Company } from './company.model';

export interface Product {
  id: number;
  code: string;
  name: string;
  characteristics: string;
  price: number;
  company: Company;
  createdAt: Date;
}
