import React from 'react';
import { styled, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { Link } from 'react-router-dom';

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
}));

const StyledButton = styled('div')(({ theme }) => ({
  color: 'white',
  cursor: 'pointer',
}));

const MenuDropDown = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <StyledLink to="/">
        <AddIcon />
      </StyledLink>
      <StyledButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ArrowDropDownIcon />
      </StyledButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Test FA</MenuItem>
        <MenuItem onClick={handleClose}>Check FA</MenuItem>
        <MenuItem onClick={handleClose}>Minimize FA</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuDropDown;
