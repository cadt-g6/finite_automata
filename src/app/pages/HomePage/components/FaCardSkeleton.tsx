import { Skeleton, Box, styled, Grid } from '@mui/material';
import React from 'react';
import FaCardItem from './FaCardItem';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px 16px',
  marginBottom: '24px',
  borderRadius: '4px',
  boxShadow:
    '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
}));

const FaCardSkeleton = () => {
  return (
    <Grid item>
      {[1, 2, 3].map(item => (
        <StyledBox key={item}>
          <Box>
            <Skeleton animation="wave" width={120} />
            <Skeleton animation="wave" width={250} />
            <Box sx={{ display: 'flex' }}>
              <Skeleton
                animation="wave"
                variant="circular"
                width={90}
                height={27}
                sx={{ margin: '18px 4px', borderRadius: '16px' }}
              />
              <Skeleton
                animation="wave"
                variant="circular"
                width={120}
                height={27}
                sx={{ margin: '18px 4px', borderRadius: '16px' }}
              />
            </Box>

            <Skeleton animation="wave" width={35} height={28} />
          </Box>
          <div>
            <Skeleton
              animation="wave"
              width={5}
              height={40}
              sx={{ marginRight: '25px' }}
            />
          </div>
        </StyledBox>
      ))}
    </Grid>
  );
};

export default FaCardSkeleton;
