import {
  Box,
  Chip,
  styled,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';
import { useHistory } from 'react-router-dom';
import FaModel from 'app/models/FaModel';
import { toStateString } from 'utils/string-utils';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px 16px',
  marginBottom: '24px',
  borderRadius: '4px',
  boxShadow:
    '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
}));

const StyledHover = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
}));

interface FaCardItemProps {
  item?: FaModel;
  [props: string]: any;
}

const FaCardItem = ({ item, ...props }: FaCardItemProps) => {
  const states = toStateString('States', item?.states || []);
  const symbols = toStateString('Symbols', item?.symbols || []);
  const finalStates = toStateString('Final states', item?.endStates || []);
  const history = useHistory();

  const onViewPressed = e => {
    if (item) {
      const id = item!.id;
      history.push(`/fas/${id}`);
    }
  };

  return (
    <StyledBox>
      <div>
        <StyledHover onClick={onViewPressed}>{item && item.title}</StyledHover>

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
