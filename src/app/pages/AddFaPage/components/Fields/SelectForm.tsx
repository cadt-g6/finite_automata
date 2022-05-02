import React from 'react';

import {
  FormControl,
  TextField,
  styled,
  Box,
  InputLabel,
  Autocomplete,
  FormHelperText,
} from '@mui/material';

const SelectField = styled(Autocomplete)(({ theme }) => ({
  'label + &': {
    marginTop: '22px',
  },
}));

const errorStyle = {
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: '1px solid red',
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: '1px solid red',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '1px solid red',
  },
};

type SelectProps = {
  error?: string;
  errorMsg?: string;
  multiple?: boolean;
  label?: string;
  [props: string]: any;
};

const SelectForm = ({
  error,
  errorMsg,
  label,
  multiple,
  options,
  onChange,
  ...props
}: SelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" shrink>
        <Box sx={{ color: '#000000' }}>{label}</Box>
      </InputLabel>
      <SelectField
        sx={error ? errorStyle : {}}
        {...props}
        multiple={multiple}
        onChange={onChange}
        options={options}
        renderInput={params => <TextField {...params} />}
      />
      {error && (
        <FormHelperText variant="standard" error={true}>
          {errorMsg}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectForm;
