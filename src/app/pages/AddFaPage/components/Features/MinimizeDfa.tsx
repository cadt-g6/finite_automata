import React, { useState } from 'react';
import { Typography, Grid, Box, styled, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import Graphviz from 'graphviz-react';
import TransitionTable from '../TransitionTable';
import MinimizeDialog from 'app/components/Dialogs/MinmizeDialog';

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

const StyledTypography = styled(Typography)(({ theme }) => ({
  display: 'block',
  width: 'max-content',
  color: '#192849',
  marginTop: '30px',
}));

const MinimizeDfa = ({ faData }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <StyledBox>
      <div>
        <Typography sx={{ fontSize: '16px' }}>Minimize DFA</Typography>
        <Typography
          sx={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)' }}
          variant="subtitle1"
        >
          Reduce the number of states from given DFA.
        </Typography>
        <StyledTypography onClick={handleOpen} sx={{ cursor: 'pointer' }}>
          Test
        </StyledTypography>
        {faData && !faData.isNFA() && (
          <MinimizeDialog
            open={open}
            faData={faData}
            handleClose={handleClose}
            content={''}
            graph={<Graphviz dot={faData.toDotString()} />}
            transitionTable={<TransitionTable faData={faData} />}
          />
        )}
      </div>
      <div>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </div>
    </StyledBox>
  );
};

export default MinimizeDfa;
