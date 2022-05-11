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
import FaModel from 'app/models/FaModel';
import FaViewHelper from 'app/helpers/FaViewHelper';

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

interface FaCardItemProps {
  item?: FaModel;
}

const FaCardItem = (props: FaCardItemProps) => {
  const item = props.item;
  const states = FaViewHelper.constructStates('States', item?.states || []);
  const symbols = FaViewHelper.constructStates('Symbols', item?.symbols || []);
  const finalStates = FaViewHelper.constructStates(
    'Final states',
    item?.endStates || [],
  );

  return (
    <StyledBox>
      <div>
        <Typography>{item && item.title}</Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: 'rgba(0,0,0,0.6)' }}
        >{`${states} - ${symbols}`}</Typography>
        <Chip
          sx={{ margin: '18px 4px', color: 'rgba(0,0,0,0.6)' }}
          label={`Start state: ${item?.startState}`}
        />
        <Chip
          sx={{ margin: '18px 4px', color: 'rgba(0,0,0,0.6)' }}
          label={finalStates}
        />
        <StyledLink to="/add">
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
