import React from 'react';
import { Typography, Grid, Box, styled, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  padding: '12px 16px',
  marginBottom: '24px',
  borderRadius: '4px',
  boxShadow:
    '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'block',
  width: 'max-content',
  textDecoration: 'none',
  color: '#192849',
  marginTop: '30px',
}));

const ConvertNFAtoDFA = () => {
  return (
    <StyledBox>
      <div>
        <Typography sx={{ fontSize: '16px' }}>NFA to DFA</Typography>
        <Typography
          sx={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)' }}
          variant="subtitle1"
        >
          Construct an equivalent DFA from an NFA
        </Typography>
        <StyledLink to="/">
          <Typography>Test</Typography>
        </StyledLink>
      </div>
      <div>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </div>
    </StyledBox>
  );
};

export default ConvertNFAtoDFA;
