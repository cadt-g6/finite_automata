import {
  Box,
  Container,
  Divider,
  Grid,
  styled,
  Pagination,
  Button,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Title from './components/Title';
import Search from './components/Search';
import FaCardContainer from './components/FaCardContainer';
import FaDatabase from 'app/services/cloud_database/FasDatabase';
import ListModel from 'app/models/ListModel';
import FaModel from 'app/models/FaModel';
import FaCardSkeleton from './components/FaCardSkeleton';

const StyledContainer = styled(Box)(({ theme }) => ({
  margin: '64px 144px',
  maxWidth: '1200px',
  minHeight: '100vh',
  [theme.breakpoints.down('md')]: {
    margin: '64px 15px',
  },
}));

export function HomePage() {
  const [faList, setFaList] = useState<ListModel<FaModel>>();
  const [filteredFa, setFilteredFa] = useState<ListModel<FaModel>>();
  const [searchKeyword, setSearchKeyword] = useState('');
  const database = new FaDatabase();
  useEffect(() => {
    async function loadFa() {
      const result = await database.fetchAllFa();
      console.log(result);
      setFaList(result);
    }
    loadFa();
  }, []);

  const loadMoreFa = async () => {
    if (faList && faList.nextPageKey) {
      try {
        const result = await database.fetchAllFa(faList.nextPageKey);
        const data: ListModel<FaModel> = { ...faList };
        data.items = [...data.items, ...result.items];
        data.nextPageKey = result.nextPageKey;
        setFaList(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSearch = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setSearchKeyword(event.target.value);
    if (faList) {
      const data: ListModel<FaModel> = { ...faList };
      data.items = data.items.filter(item =>
        item.title?.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
      setFilteredFa(data);
    }
  };
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
          <Search onSearch={onSearch} />
          <Grid item xs={12} md={9}>
            <FaCardContainer
              faList={searchKeyword.length > 0 ? filteredFa! : faList!}
            />
            {faList ? (
              faList.nextPageKey && !searchKeyword.length ? (
                <Button
                  variant="outlined"
                  onClick={loadMoreFa}
                  sx={{ display: 'flex', width: '100%' }}
                >
                  Load More...
                </Button>
              ) : (
                <Typography sx={{ textAlign: 'center' }}>
                  No more datas
                </Typography>
              )
            ) : (
              <FaCardSkeleton />
            )}
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  );
}
