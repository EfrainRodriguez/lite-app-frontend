import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';

import CustomTextField from '@/components/TextInput';
import { validationSchema } from './utils/validation';
import { ProductFormDto } from './dtos/productFormDto';
import AutocompleteInput from '@/components/AutocompleteInput';
import { Company } from '@/models/company.model';
import { Category } from '@/models/product.model';

interface ProductFormProps {
  isLoading?: boolean;
  companies?: Company[];
  categories?: Category[];
  initialValues?: ProductFormDto;
  onSubmit?: (values: ProductFormDto) => void;
}

const ProductForm = ({
  isLoading = false,
  companies = [],
  categories = [],
  initialValues = {
    code: '',
    name: '',
    characteristics: '',
    price: 0,
    company: null as any,
    categories: null as any
  },
  onSubmit = () => {}
}: ProductFormProps) => {
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
              ...formik.getFieldProps('code'),
              name: 'code',
              label: 'Code',
              placeholder: 'Type the code',
              helperText:
                formik.touched.code === true ? formik.errors.code : null,
              error:
                formik.touched.code === true
                  ? Boolean(formik.errors.code)
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
              ...formik.getFieldProps('characteristics'),
              name: 'characteristics',
              label: 'Characteristics',
              placeholder: 'Type the characteristics',
              helperText:
                formik.touched.characteristics === true
                  ? formik.errors.characteristics
                  : null,
              error:
                formik.touched.characteristics === true
                  ? Boolean(formik.errors.characteristics)
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
              ...formik.getFieldProps('price'),
              name: 'price',
              label: 'Price',
              type: 'number',
              placeholder: 'Type the price',
              helperText:
                formik.touched.price === true ? formik.errors.price : null,
              error:
                formik.touched.price === true
                  ? Boolean(formik.errors.price)
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
          <AutocompleteInput
            inputProps={{
              required: true,
              name: 'company',
              label: 'Company',
              placeholder: 'Type the company',
              value: formik.values.company?.name ?? '',
              // helperText: (formik.touched.company as unknown as boolean)
              //   ? formik.errors.company
              //   : null,
              error: (formik.touched.company as unknown as boolean)
                ? Boolean(formik.errors.company)
                : false,
              onBlur: formik.handleBlur
              // onChange: (event) => {
              //   formik.setFieldValue('guest', event?.target?.value);
              //   formik.handleChange(event);
              //   // handleChange({
              //   //   target: {
              //   //     name: 'guest-text',
              //   //     value: event?.target?.value
              //   //   }
              //   // } as unknown as React.ChangeEvent<HTMLInputElement>);
              // }
            }}
            autocompleteProps={{
              noOptionsText: 'No companies found',
              value: formik.values.company,
              getOptionLabel: (option: Company) => `${option.name}`,
              isOptionEqualToValue: (option: Company, value: Company) =>
                option?.id === value?.id,
              options: companies,
              onChange: (value) => {
                formik.handleChange({
                  target: {
                    name: 'company',
                    value
                  }
                } as unknown as React.ChangeEvent<HTMLInputElement>);
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AutocompleteInput
            inputProps={{
              required: true,
              name: 'categories',
              label: 'Categories',
              placeholder: 'Type the categories',
              value: formik.values.categories?.name ?? '',
              error: (formik.touched.categories as unknown as boolean)
                ? Boolean(formik.errors.categories)
                : false,
              onBlur: formik.handleBlur
            }}
            autocompleteProps={{
              noOptionsText: 'No companies found',
              value: formik.values.categories,
              getOptionLabel: (option: Category) => `${option.name}`,
              isOptionEqualToValue: (option: Category, value: Category) =>
                option?.id === value?.id,
              options: categories,
              onChange: (value) => {
                formik.handleChange({
                  target: {
                    name: 'categories',
                    value
                  }
                } as unknown as React.ChangeEvent<HTMLInputElement>);
              }
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

export default ProductForm;
