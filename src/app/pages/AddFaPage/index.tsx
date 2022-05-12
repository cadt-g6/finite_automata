import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FormFields from './components/FormFields';
import { getTransitionObjectFromForm } from 'utils/form-utils';
import FaModel from 'app/models/FaModel';
import Features from './components/Features';
import SnackBar from 'app/components/SnackBar';
import { useParams } from 'react-router-dom';
import FaCacheService from 'app/services/cache/FaCacheService';
import FaDatabase from 'app/services/cloud_database/FasDatabase';
import { useHistory } from 'react-router-dom';

const StyledContainer = styled('div')(({ theme }) => ({
  margin: '64px 144px',
  maxWidth: '1600px',
  [theme.breakpoints.down('lg')]: {
    margin: '64px 15px',
  },
}));

type Params = {
  id: string;
};

export function AddFaPage() {
  const [faData, setFaData] = useState<any>();
  const [open, setOpen] = useState(false);
  const { id } = useParams<Params>();
  const history = useHistory();

  useEffect(() => {
    async function loadExistingFaById(id) {
      // fetch from cache
      let fa = new FaCacheService().get(id);
      if (fa) {
        setFaData(fa);
      } else {
        // fetch from firebase
        fa = await new FaDatabase().fetchOne(id);
        setFaData(fa);
      }
      if (!fa) history.push({ pathname: '/add' });
    }
    if (id) loadExistingFaById(id);
  }, [history, id]);

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
