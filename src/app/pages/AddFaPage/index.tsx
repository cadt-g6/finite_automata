import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FormFields from './components/FormFields';
import { getTransitionObjectFromForm } from 'utils/form-utils';
import FaModel from 'app/models/FaModel';
import Features from './components/Features';

const StyledContainer = styled('div')(({ theme }) => ({
  margin: '64px 144px',
  maxWidth: '1600px',
  [theme.breakpoints.down('lg')]: {
    margin: '64px 15px',
  },
}));

export function AddFaPage() {
  const [faData, setFaData] = useState<any>();
  const onSubmit = (data, e) => {
    const {
      initialState,
      states,
      alphabets,

      endStates,
      ...newData
    } = data;
    const Fa = {
      initialState,
      states,
      alphabets,

      endStates,
      transitions: getTransitionObjectFromForm(data),
    };
    setFaData(Fa);
  };
  useEffect(() => {
    if (faData) {
      const data = new FaModel(
        faData.states,
        faData.alphabets,
        faData.initialState,
        faData.endStates,
        faData.transitions,
      );
      console.log('IS NFA ?', data.isNFA());
    }

    console.log(faData);
  }, [faData]);
  return (
    <>
      <Helmet>
        <title>AddFaPage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <StyledContainer>
        <FormFields onSubmit={onSubmit} />
        <Features />
      </StyledContainer>
    </>
  );
}
