import * as yup from 'yup';

import { CompanyFormDto } from '../dtos/companyFormDto';

export const validationSchema: yup.ObjectSchema<CompanyFormDto> = yup.object({
  nit: yup.string().required('El nit es requerido'),
  name: yup.string().required('El nombre es requerido'),
  address: yup.string().notRequired(),
  phone: yup.string().notRequired()
});
