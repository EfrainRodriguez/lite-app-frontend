import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';

import CustomTextField from '@/components/TextInput';
import { validationSchema } from './utils/validation';
import { CompanyFormDto } from './dtos/companyFormDto';

interface CompanyFormProps {
  isLoading?: boolean;
  initialValues?: CompanyFormDto;
  onSubmit?: (values: CompanyFormDto) => void;
}

const CompanyForm = ({
  isLoading = false,
  initialValues = {
    nit: '',
    name: '',
    address: '',
    phone: ''
  },
  onSubmit = () => {}
}: CompanyFormProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h6" mb={3} fontWeight={700}>
        Company form
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            inputProps={{
              ...formik.getFieldProps('nit'),
              name: 'nit',
              label: 'NIT',
              placeholder: 'Type the NIT',
              helperText:
                formik.touched.nit === true ? formik.errors.nit : null,
              error:
                formik.touched.nit === true
                  ? Boolean(formik.errors.nit)
                  : false,
              onBlur: formik.handleBlur,
              onChange: formik.handleChange
            }}
            formControlProps={{
              sx: { mb: 2 }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            inputProps={{
              ...formik.getFieldProps('name'),
              name: 'name',
              label: 'Name',
              placeholder: 'Type the name',
              helperText:
                formik.touched.name === true ? formik.errors.name : null,
              error:
                formik.touched.name === true
                  ? Boolean(formik.errors.name)
                  : false,
              onBlur: formik.handleBlur,
              onChange: formik.handleChange
            }}
            formControlProps={{
              sx: { mb: 2 }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            inputProps={{
              ...formik.getFieldProps('address'),
              name: 'address',
              label: 'Address',
              placeholder: 'Type the address',
              helperText:
                formik.touched.address === true ? formik.errors.address : null,
              error:
                formik.touched.address === true
                  ? Boolean(formik.errors.address)
                  : false,
              onBlur: formik.handleBlur,
              onChange: formik.handleChange
            }}
            formControlProps={{
              sx: { mb: 2 }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            inputProps={{
              ...formik.getFieldProps('phone'),
              name: 'phone',
              label: 'Phone',
              placeholder: 'Type the phone',
              helperText:
                formik.touched.phone === true ? formik.errors.phone : null,
              error:
                formik.touched.phone === true
                  ? Boolean(formik.errors.phone)
                  : false,
              onBlur: formik.handleBlur,
              onChange: formik.handleChange
            }}
            formControlProps={{
              sx: { mb: 2 }
            }}
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="end" sx={{ mt: 3 }}>
        <Button variant="contained" type="submit">
          Save data{' '}
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

export default CompanyForm;
