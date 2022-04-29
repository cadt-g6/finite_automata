import React from 'react';

import {
  FormControl,
  TextField,
  styled,
  Box,
  Tooltip,
  InputLabel,
  FormHelperText,
} from '@mui/material';

const InputField = styled(TextField)(({ theme }) => ({
  'label + &': {
    marginTop: '22px',
  },
}));

const InputForm = ({
  error,
  errorMsg,
  toolTipValue,
  label,
  onChange,
  ...props
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" shrink>
        <Box sx={{ color: '#000000' }}>{label}</Box>
      </InputLabel>
      <Tooltip arrow title={toolTipValue} placement="bottom-end">
        <InputField
          error={error ? true : false}
          onChange={onChange}
          {...props}
        />
      </Tooltip>
      {error && (
        <FormHelperText variant="standard" error={true}>
          {errorMsg}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default InputForm;
