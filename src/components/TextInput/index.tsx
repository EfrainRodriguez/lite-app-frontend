import {
  TextField,
  FormControl,
  FormHelperText,
  type TextFieldProps,
  type FormControlProps,
  type FormHelperTextProps
} from '@mui/material';

interface TextInputProps {
  inputProps?: TextFieldProps;
  formControlProps?: FormControlProps;
  helperTextProps?: FormHelperTextProps;
}

const TextInput = ({
  inputProps = {},
  formControlProps = {},
  helperTextProps = {}
}: TextInputProps) => {
  const { error, helperText, ...rest } = inputProps;

  return (
    <FormControl fullWidth error={error} {...formControlProps}>
      <TextField size="small" autoComplete="off" {...rest} />
      {Boolean(error) && (
        <FormHelperText
          sx={{
            mt: 0
          }}
          {...helperTextProps}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TextInput;
