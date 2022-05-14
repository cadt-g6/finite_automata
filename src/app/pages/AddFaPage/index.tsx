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
import { useLocation, useParams } from 'react-router-dom';
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

interface stateType {
  openSnackBar: boolean;
}

export function AddFaPage() {
  const history = useHistory();
  const location = useLocation<stateType>();
  const [faData, setFaData] = useState<FaModel>();
  const [open, setOpen] = useState(location.state?.openSnackBar);
  const { id } = useParams<Params>();

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

  const onSubmit = async (data, e) => {
    const { startState, states, symbols, title, endStates, ...newData } = data;
    let Fa;
    if (faData) {
      Fa = faData?.copyWith(
        getArrayFromValues(states),
        getArrayFromValues(symbols),
        startState,
        endStates,
        getTransitionObjectFromForm(data),
        ...Array(2),
        title,
      );
    } else {
      Fa = new FaModel(
        getArrayFromValues(states),
        getArrayFromValues(symbols),
        startState,
        endStates,
        getTransitionObjectFromForm(data),
        ...Array(2),
        title,
      );
    }

    try {
      if (location.pathname === '/add') {
        const newFa = await new FaDatabase().create(Fa);
        if (newFa) {
          history.replace({
            pathname: `/fas/${newFa.id}`,
            state: { openSnackBar: true },
          } as any);
        }
      } else {
        Fa.updatedAt = new Date().toUTCString();
        const updatedFa = await new FaDatabase().update(Fa.id!, Fa);
        if (updatedFa) {
          new FaCacheService().set(updatedFa);
          history.replace({
            pathname: `/fas/${updatedFa.id}`,
            state: { openSnackBar: true },
          } as any);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
