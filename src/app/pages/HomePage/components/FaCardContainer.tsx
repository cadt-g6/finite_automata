import { Grid } from '@mui/material';
import FaModel from 'app/models/FaModel';
import ListModel from 'app/models/ListModel';
import React from 'react';
import FaCardItem from './FaCardItem';

interface FaCardContainerProps {
  faList: ListModel<FaModel>;
  setFaList: React.Dispatch<
    React.SetStateAction<ListModel<FaModel> | undefined>
  >;
  [props: string]: any;
}

const FaCardContainer = ({
  faList,
  setFaList,
  ...props
}: FaCardContainerProps) => {
  return (
    <Grid item>
      {faList &&
        faList.items.map((item, index) => {
          return (
            <FaCardItem
              key={index}
              item={item}
              faList={faList}
              setFaList={setFaList}
            />
          );
        })}
    </Grid>
  );
};

export default FaCardContainer;
