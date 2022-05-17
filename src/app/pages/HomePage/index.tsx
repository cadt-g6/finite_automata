import { Box, Divider, Grid, styled, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Title from './components/Title';
import Search from './components/Search';
import FaCardContainer from './components/FaCardContainer';
import FaDatabase from 'app/services/cloud_database/FasDatabase';
import ListModel from 'app/models/ListModel';
import FaModel from 'app/models/FaModel';
import FaCardSkeleton from './components/FaCardSkeleton';
import FaCacheService from 'app/services/cache/FaCacheService';
import useQuery from 'app/hooks/useQuery';
import { validateOrderByQuery, validateSortByQuery } from 'utils/string-utils';
import { OrderByFields } from 'app/services/cloud_database/BaseDatabase';
import { OrderByDirection } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import SnackBar from 'app/components/SnackBar';

const StyledContainer = styled(Box)(({ theme }) => ({
  margin: '64px 144px',
  maxWidth: '1200px',
  minHeight: '100vh',
  [theme.breakpoints.down('md')]: {
    margin: '64px 15px',
  },
}));

interface locationType {
  openSnackBar: boolean;
}

export function HomePage() {
  const query = useQuery();
  const location = useLocation<locationType>();
  const [faList, setFaList] = useState<ListModel<FaModel>>();
  const [filteredFa, setFilteredFa] = useState<ListModel<FaModel>>();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [open, setOpen] = useState(false);
  const [orderBy, setOrderBy] = useState<OrderByDirection>(
    validateSortByQuery(query.get('sortBy')),
  );
  const [sortBy, setSortBy] = useState<OrderByFields>(
    validateOrderByQuery(query.get('orderBy')),
  );

  async function loadFa() {
    const result = await new FaDatabase().fetchAllFa(
      undefined,
      undefined,
      sortBy,
      orderBy,
    );
    console.log(result);
    setFaList(result);
  }

  useEffect(() => {
    setOpen(location.state?.openSnackBar);
  }, [location]);

  useEffect(() => {
    loadFa();
  }, [sortBy, orderBy]);

  useEffect(() => {
    function cacheItems() {
      const cacheService = new FaCacheService();
      cacheService.setAll(faList?.items || []);
    }
    cacheItems();
  }, [faList?.items, setFaList]);

  const onCloseSnackBar = () => {
    setOpen(false);
  };
  const loadMoreFa = async () => {
    if (faList && faList.nextPageKey) {
      try {
        const result = await new FaDatabase().fetchAllFa(
          faList.nextPageKey,
          undefined,
          sortBy,
          orderBy,
        );
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
    const keywordEvent = event.target.value;
    setSearchKeyword(event.target.value);
    if (faList) {
      const data: ListModel<FaModel> = { ...faList };
      data.items = data.items.filter(item =>
        item.title?.toLowerCase().includes(keywordEvent.toLowerCase()),
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
        <Title
          setSortBy={setSortBy}
          sortBy={sortBy}
          setOrderBy={setOrderBy}
          orderBy={orderBy}
        />
        <Divider sx={{ margin: '22px 0' }} />
        <Grid sx={{ maxWidth: '1200px' }} container direction="row" spacing={2}>
          <Search onSearch={onSearch} />
          <Grid item xs={12} md={9}>
            <FaCardContainer
              faList={searchKeyword.length > 0 ? filteredFa! : faList!}
              setFaList={setFaList}
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
          <SnackBar
            open={open}
            onClose={onCloseSnackBar}
            type="success"
            content="Delete Successfully"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          />
        </Grid>
      </StyledContainer>
    </>
  );
}
