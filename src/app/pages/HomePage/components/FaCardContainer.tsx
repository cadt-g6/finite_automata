import { Grid } from '@mui/material';
import FaModel from 'app/models/FaModel';
import ListModel from 'app/models/ListModel';
import React from 'react';
import FaCardItem from './FaCardItem';

interface FaCardContainerProps {
  faList?: ListModel<FaModel>;
}

const FaCardContainer = (props: FaCardContainerProps) => {
  return (
    <Grid item>
      {props.faList?.items.map(item => {
        return <FaCardItem item={item} />;
      })}
    </Grid>
  );
};

export default FaCardContainer;
