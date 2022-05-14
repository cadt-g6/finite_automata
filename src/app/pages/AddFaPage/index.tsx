import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FormFields from './components/FormFields';
import {
  getArrayFromValues,
  getTransitionObjectFromForm,
} from 'utils/form-utils';
import FaModel from 'app/models/FaModel';
import Features from './components/Features';
import SnackBar from 'app/components/SnackBar';
import { useParams } from 'react-router-dom';
import FaCacheService from 'app/services/cache/FaCacheService';
import FaDatabase from 'app/services/cloud_database/FasDatabase';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Backdrop } from '@mui/material';

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
  const [faData, setFaData] = useState<FaModel>();
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
    const { startState, states, symbols, title, endStates, ...newData } = data;

    const Fa = new FaModel(
      getArrayFromValues(states),
      getArrayFromValues(symbols),
      startState,
      endStates,
      getTransitionObjectFromForm(data),
      ...Array(2),
      title,
    );
    console.log(Fa);
    setFaData(Fa);
    setOpen(true);
  };

  const onCloseSnackBar = () => {
    setOpen(false);
  };

  if (!faData && id)
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={id ? true : false}
      >
        <CircularProgress />
      </Backdrop>
    );
  return (
    <>
      <Helmet>
        <title>AddFaPage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <StyledContainer>
        <FormFields faData={faData} onSubmit={onSubmit} />
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
