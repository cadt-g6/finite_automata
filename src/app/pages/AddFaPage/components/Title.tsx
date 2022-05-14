import React from 'react';
import { Typography, Button, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const Title = ({ control }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Controller
        name="title"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            size="small"
            onChange={onChange}
            sx={{ width: '40vw', position: 'relative', top: '14px' }}
            placeholder="Design FA..."
            variant="standard"
            value={value}
            InputProps={{ disableUnderline: true }}
          />
        )}
      />

      <Button type="submit" variant="contained">
        Save
      </Button>
    </div>
  );
};

export default Title;
