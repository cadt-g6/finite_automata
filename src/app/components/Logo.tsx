import React from 'react';
import { styled } from '@mui/material';

import CadtLogo from 'app/assets/CadtLogo.svg';

const Img = styled(`img`)({
  height: '24px',
  marginRight: '36px',
});

const Logo = () => {
  return <Img src={CadtLogo} />;
};

export default Logo;
