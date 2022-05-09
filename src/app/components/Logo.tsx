import React from 'react';
import { styled } from '@mui/material';

import IdtLogo from 'app/assets/IdtLogo.svg';
import { Link } from 'react-router-dom';

const Img = styled(`img`)(({ theme }) => ({
  height: '42px',
  marginRight: '36px',
  [theme.breakpoints.down('sm')]: {
    height: '30px',
  },
}));

const Logo = () => {
  return (
    <Link to="/">
      <Img src={IdtLogo} />
    </Link>
  );
};

export default Logo;
