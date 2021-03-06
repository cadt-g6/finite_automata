import * as React from 'react';
import { Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import AppConstants from 'app/constants/AppConstants';

const StyleFooter = styled(`div`)(() => ({
  backgroundColor: '#192849',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Footer = () => {
  return (
    <StyleFooter>
      <Typography sx={{ padding: '20px 0', color: 'white', fontSize: '16px' }}>
        &copy;CADTG6 2022 - Made with ☕️ by{' '}
        <Link
          style={{ color: 'white', fontSize: '16px' }}
          to={{ pathname: AppConstants.teamUrl }}
          target="_blank"
        >
          Team 4
        </Link>
      </Typography>
    </StyleFooter>
  );
};

export default Footer;
