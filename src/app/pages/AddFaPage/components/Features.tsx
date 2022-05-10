import { Typography, Grid, Box, styled, IconButton } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';
import { Link } from 'react-router-dom';
import TestIfNfaOrDfa from './Features/TestIfNfaOrDfa';
import AcceptedString from './Features/AcceptedString';
import ConvertNFAtoDFA from './Features/ConvertNFAtoDFA';
import MinimizeDfa from './Features/MinimizeDfa';
import FaModel from 'app/models/FaModel';

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

const Features = ({ faData }) => {
  return (
    <div style={{ marginTop: '64px' }}>
      <Typography variant="h4">Features</Typography>
      <Grid container sx={{ marginTop: '16px' }} spacing={2}>
        <Grid item xs={12} md={4.5}>
          <TestIfNfaOrDfa faData={faData} />
        </Grid>
        <Grid item xs={12} md={4.5}>
          <AcceptedString faData={faData} />
        </Grid>
        <Grid item xs={12} md={4.5}>
          <ConvertNFAtoDFA />
        </Grid>
        <Grid item xs={12} md={4.5}>
          <MinimizeDfa />
        </Grid>
      </Grid>
    </div>
  );
};

export default Features;
