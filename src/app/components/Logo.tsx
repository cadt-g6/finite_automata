import React from 'react';
import { styled } from '@mui/material';

import IdtLogo from 'app/assets/IdtLogo.svg';

const Img = styled(`img`)({
  height: '42px',
  marginRight: '36px',
});

const Logo = () => {
  return <Img src={IdtLogo} />;
};

export default Logo;
