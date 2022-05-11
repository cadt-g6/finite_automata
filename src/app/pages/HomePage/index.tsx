import {
  Box,
  Container,
  Divider,
  Grid,
  styled,
  Pagination,
} from '@mui/material';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import Title from './components/Title';
import Search from './components/Search';
import FaCardContainer from './components/FaCardContainer';
import FaDatabase from 'app/services/cloud_database/FasDatabase';
import ListModel from 'app/models/ListModel';
import FaModel from 'app/models/FaModel';

const StyledContainer = styled(Box)(({ theme }) => ({
  margin: '64px 144px',
  maxWidth: '1200px',
  minHeight: '100vh',
  [theme.breakpoints.down('md')]: {
    margin: '64px 15px',
  },
}));

export function HomePage() {
  const [faList, setFaList] = React.useState<ListModel<FaModel>>();

  React.useEffect(() => {
    async function loadFa() {
      const database = new FaDatabase();
      const result = await database.fetchAllFa();
      setFaList(result);
    }
    loadFa();
  }, []);

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <StyledContainer>
        <Title />
        <Divider sx={{ margin: '22px 0' }} />
        <Grid sx={{ maxWidth: '1200px' }} container direction="row" spacing={2}>
          <Search />
          <Grid item xs={12} md={9}>
            <FaCardContainer faList={faList!} />
            <Pagination
              size="small"
              sx={{ display: 'flex', justifyContent: 'center' }}
              count={10}
            />
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  );
}
