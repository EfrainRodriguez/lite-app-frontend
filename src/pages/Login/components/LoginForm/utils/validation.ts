import * as yup from 'yup';

import { LoginFormDto } from '../dtos/loginFormDto';

export const validationSchema: yup.ObjectSchema<LoginFormDto> = yup.object({
  username: yup.string().required('El usuario es requerido'),
  password: yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    // .matches(/^(?=.*[a-z])/, 'La contraseña debe tener al menos una mayúscula')
    // .matches(/^(?=.*[A-Z])/, 'La contraseña debe tener al menos una mayúscula')
    // .matches(/^(?=.*[0-9])/, 'La contraseña debe tener al menos un número')
    .required('La contraseña es requerida')
});
