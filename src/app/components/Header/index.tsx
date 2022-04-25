import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../Logo';
import MenuLink from './MenuLink/MenuLink';
import MenuDropDown from './MenuDropDown/MenuDropDown';

interface Props {}

const Header = (props: Props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Logo />
        <MenuLink />
        <MenuDropDown />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
