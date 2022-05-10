import React from 'react';
import { Typography, Button } from '@mui/material';

const Title = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h5">Design FA</Typography>
      <Button type="submit" variant="contained">
        Save
      </Button>
    </div>
  );
};

export default Title;
