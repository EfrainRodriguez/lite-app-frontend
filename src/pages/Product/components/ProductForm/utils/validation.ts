import * as yup from 'yup';

import { ProductFormDto } from '../dtos/productFormDto';
import { Company } from '@/models/company.model';
import { Category } from '@/models/product.model';

export const validationSchema: yup.ObjectSchema<ProductFormDto> = yup.object({
  code: yup.string().required('El código es requerido'),
  name: yup.string().required('El nombre es requerido'),
  characteristics: yup.string().notRequired(),
  price: yup.number().required('El precio es requerido'),
  company: yup.object().shape({
    id: yup.number().required('La compañía es requerida'),
    nit: yup.string().required('El nit es requerido'),
    name: yup.string().required('El nombre es requerido'),
    address: yup.string().notRequired(),
    phone: yup.string().notRequired()
  }) as yup.ObjectSchema<Company>,
  categories: yup.object().shape({
    id: yup.number().required('La categoría es requerida'),
    name: yup.string().required('El nombre es requerido'),
    description: yup.string().notRequired()
  }) as yup.ObjectSchema<Category>
});
