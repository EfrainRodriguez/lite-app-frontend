import { useState } from 'react';
import { Person, VisibilityOff, Visibility, Lock } from '@mui/icons-material';
import { IconButton, Box, Button, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';

import CustomTextField from '@/components/TextInput';
import { validationSchema } from './utils/validation';
import { LoginFormDto } from './dtos/loginFormDto';

interface LoginFormProps {
  isLoading?: boolean;
  onSubmit?: (values: LoginFormDto) => void;
}

const LoginForm = ({
  isLoading = false,
  onSubmit = () => {}
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CustomTextField
        inputProps={{
          name: 'username',
          label: 'Username',
          placeholder: 'Type your username',
          InputProps: {
            startAdornment: (
              <Person
                sx={{ color: (theme) => theme.palette.grey[500], mr: 1 }}
              />
            )
          },
          helperText:
            formik.touched.username === true ? formik.errors.username : null,
          error:
            formik.touched.username === true
              ? Boolean(formik.errors.username)
              : false,
          onBlur: formik.handleBlur,
          onChange: formik.handleChange
        }}
        formControlProps={{
          sx: { mb: 2 }
        }}
      />
      <CustomTextField
        inputProps={{
          label: 'Password',
          name: 'password',
          placeholder: 'Type your password',
          type: showPassword ? 'text' : 'password',
          InputProps: {
            startAdornment: (
              <Lock sx={{ color: (theme) => theme.palette.grey[500], mr: 1 }} />
            ),
            endAdornment: (
              <IconButton
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            )
          },
          helperText:
            formik.touched.password === true ? formik.errors.password : null,
          error:
            formik.touched.password === true
              ? Boolean(formik.errors.password)
              : false,
          onBlur: formik.handleBlur,
          onChange: formik.handleChange
        }}
        formControlProps={{
          sx: { mb: 2 }
        }}
      />
      <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
        <Button variant="contained" type="submit">
          Login{' '}
          {isLoading && (
            <CircularProgress
              sx={{ ml: 1.5 }}
              size={20}
              color="inherit"
              thickness={4}
            />
          )}
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
