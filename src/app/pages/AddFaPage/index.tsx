import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FormFields from './components/FormFields';
import { getTransitionObjectFromForm } from 'utils/form-utils';
import FaModel from 'app/models/FaModel';
import Features from './components/Features';
import SnackBar from 'app/components/SnackBar';
import Slide, { SlideProps } from '@mui/material/Slide';

const StyledContainer = styled('div')(({ theme }) => ({
  margin: '64px 144px',
  maxWidth: '1600px',
  [theme.breakpoints.down('lg')]: {
    margin: '64px 15px',
  },
}));

export function AddFaPage() {
  const [faData, setFaData] = useState<any>();
  const [open, setOpen] = useState(false);
  const onSubmit = (data, e) => {
    const { initialState, states, alphabets, endStates, ...newData } = data;

    const Fa = new FaModel(
      states,
      alphabets,
      initialState,
      endStates,
      getTransitionObjectFromForm(data),
    );
    setFaData(Fa);
    setOpen(true);
  };
  useEffect(() => {
    if (faData) {
      console.log('IS NFA ?', faData.isNFA());
    }

    console.log(faData);
  }, [faData]);

  const onCloseSnackBar = () => {
    setOpen(false);
  };
  return (
    <>
      <Helmet>
        <title>AddFaPage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <StyledContainer>
        <FormFields onSubmit={onSubmit} />
        <Features faData={faData} />
      </StyledContainer>
      <SnackBar
        open={open}
        onClose={onCloseSnackBar}
        type="success"
        content="Save Successfully"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </>
  );
}
