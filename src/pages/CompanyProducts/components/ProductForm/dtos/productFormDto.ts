import { Company } from '@/models/company.model';
import { Category } from '@/models/product.model';

export interface ProductFormDto {
  code: string;
  name: string;
  characteristics?: string | null;
  price: number;
  company: Company;
  categories: Category;
}
