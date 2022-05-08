import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../Logo';
import OurTeam from './OurTeam/OurTeam';

interface Props {}

const Header = (props: Props) => {
  return (
    <AppBar sx={{backgroundColor: '#192849'}} position="static">
      <Toolbar sx={{display: 'flex',justifyContent: 'space-between'}}>
        <Logo />
        <OurTeam />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
