import React from 'react';
import { styled, Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import AppConstants from 'app/constants/AppConstants';

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
}));

const OurTeam = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <StyledLink to={{ pathname: AppConstants.teamUrl }} target="_blank">
        <Typography
          variant="h6"
          sx={theme => ({
            fontSize: '14px',
            [theme.breakpoints.down('sm')]: {
              fontSize: '12px',
            },
          })}
        >
          OUR TEAM
        </Typography>
      </StyledLink>
    </div>
  );
};

export default OurTeam;
