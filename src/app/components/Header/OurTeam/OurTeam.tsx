import React from 'react';
import { styled, Typography } from '@mui/material';

import { Link } from 'react-router-dom';

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
}));

const OurTeam = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <StyledLink to="/team">
        <Typography variant='h6' sx={{fontSize: '14px'}}>OUR TEAM</Typography>
      </StyledLink>
    </div>
  );
};

export default OurTeam;
