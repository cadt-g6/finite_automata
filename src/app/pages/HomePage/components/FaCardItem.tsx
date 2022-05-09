import {
  Box,
  Chip,
  styled,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';
import { Link } from 'react-router-dom';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
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
}));

const FaCardItem = () => {
  return (
    <StyledBox>
      <div>
        <Typography>Finite Automata - Fa</Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: 'rgba(0,0,0,0.6)' }}
        >{`State:{q1,q2,q3,q4,q5} - Symbol: {a,b,c}`}</Typography>
        <Chip
          sx={{ margin: '18px 4px', color: 'rgba(0,0,0,0.6)' }}
          label="Start state: q0"
        />
        <Chip
          sx={{ margin: '18px 4px', color: 'rgba(0,0,0,0.6)' }}
          label="Final state: {q2, q4}"
        />
        <StyledLink to="/">
          <Typography variant="subtitle1">View</Typography>
        </StyledLink>
      </div>
      <div>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
        <Menu open={false}>
          <MenuItem>Edit</MenuItem>
        </Menu>
      </div>
    </StyledBox>
  );
};

export default FaCardItem;
