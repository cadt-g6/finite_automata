import { Grid } from '@mui/material';
import FaModel from 'app/models/FaModel';
import ListModel from 'app/models/ListModel';
import React from 'react';
import FaCardItem from './FaCardItem';

interface FaCardContainerProps {
  faList: ListModel<FaModel>;
  [props: string]: any;
}

const FaCardContainer = ({ faList, ...props }: FaCardContainerProps) => {
  return (
    <Grid item>
      {faList &&
        faList.items.map((item, index) => {
          return <FaCardItem key={index} item={item} />;
        })}
    </Grid>
  );
};

export default FaCardContainer;
