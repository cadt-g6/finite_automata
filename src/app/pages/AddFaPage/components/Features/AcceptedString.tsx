import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Box,
  styled,
  IconButton,
  TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import StringAcceptedDialog from 'app/components/Dialogs/StringAcceptedDiaglog';
import { Graphviz } from 'graphviz-react';
import TransitionTable from '../TransitionTable';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  minHeight: '126px',
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
  textDecoration: 'none',
  color: '#192849',
  marginLeft: '6px',
}));

const AcceptedString = ({ faData }) => {
  const [open, setOpen] = useState(false);
  const [testString, setTestString] = useState('');
  const isNfa = faData && faData.isNFA();
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <StyledBox>
      <div>
        <Typography sx={{ fontSize: '16px' }}>
          Test if a FA is deterministic or non-deterministic
        </Typography>
        <Typography
          sx={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)' }}
          variant="subtitle1"
        >
          Language accepted by the FA.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '14px' }}>
          <TextField
            size="small"
            sx={{ maxWidth: '100px' }}
            placeholder="abc..."
            value={testString}
            onChange={event => setTestString(event.target.value)}
          />
          <StyledTypography onClick={handleOpen} sx={{ cursor: 'pointer' }}>
            Test
          </StyledTypography>
        </Box>
        {faData && (
          <StringAcceptedDialog
            faData={faData}
            isAccepted={
              isNfa
                ? faData.stringAcceptedByNFA(testString)
                : faData.stringAcceptedByDFA(testString)
            }
            isNfa={isNfa}
            content={testString}
            open={open}
            handleClose={handleClose}
            graph={
              <Graphviz
                dot={faData.toDotString()}
                options={{ height: '200px' }}
              />
            }
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

export default AcceptedString;
