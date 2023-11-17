import { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  FormControl,
  Autocomplete,
  FormHelperText,
  type TextFieldProps,
  type FormControlProps,
  type AutocompleteProps,
  type FormHelperTextProps
} from '@mui/material';
import _ from 'lodash';

interface AutocompleteCustomProps<T>
  extends Omit<
    AutocompleteProps<T, false, false, false>,
    | 'options'
    | 'getOptionLabel'
    | 'renderInput'
    | 'onChange'
    | 'value'
    | 'onInputChange'
  > {
  options: T[];
  getOptionLabel: (option: T) => string;
  renderInput?: (params: any) => JSX.Element;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  onChange?: (value: T | null) => void;
  value?: T | null;
  onInputChange?: (value: any) => void;
}

interface AutocompleteInputProps<T> {
  inputProps?: TextFieldProps;
  formControlProps?: FormControlProps;
  autocompleteProps?: AutocompleteCustomProps<T>;
  helperTextProps?: FormHelperTextProps;
  onDebouncedChange?: (value: string) => void;
}

const AutocompleteInput = <T,>({
  inputProps = {},
  formControlProps = {},
  autocompleteProps = {
    options: [],
    getOptionLabel: () => ''
  },
  helperTextProps = {},
  onDebouncedChange = () => {}
}: AutocompleteInputProps<T>) => {
  const { error, helperText, ...rest } = inputProps;
  const {
    value: initialValue,
    onChange,
    onInputChange,
    ...restAutocompleteProps
  } = autocompleteProps;

  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<T | null>(initialValue ?? null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeDebounced = useCallback(
    _.debounce((value: string) => {
      onDebouncedChange(value);
    }, 500),
    []
  );

  const handleInputChange = (_event: any, value: any) => {
    setInputValue(value);
    onInputChange?.(value);
    handleChangeDebounced(value);
  };

  const handleChange = (_event: any, newValue: T | null) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    setValue(initialValue ?? null);
  }, [initialValue]);

  return (
    <FormControl fullWidth error={error} {...formControlProps}>
      <Autocomplete
        {...restAutocompleteProps}
        value={value}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        renderInput={(params) => {
          return (
            <TextField {...params} size="small" autoComplete="off" {...rest} />
          );
        }}
      />
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

export default AutocompleteInput;
