import { Grid } from '@mui/material';
import React from 'react';
import FaCardItem from './FaCardItem';

const FaCardContainer = () => {
  return (
    <Grid item>
      <FaCardItem />
      <FaCardItem />
      <FaCardItem />
    </Grid>
  );
};

export default FaCardContainer;
