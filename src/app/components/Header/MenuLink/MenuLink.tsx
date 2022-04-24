import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, styled } from '@mui/material';

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
}));

const MenuLink = () => {
  return (
    <Stack direction="row" spacing={2} flexGrow={1}>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/">Team</StyledLink>
    </Stack>
  );
};

export default MenuLink;
