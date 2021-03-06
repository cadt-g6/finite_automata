import React from 'react';
import BaseDialog from './BaseDialog';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
  Box,
  useTheme,
} from '@mui/material';
import { toStateString } from 'utils/string-utils';

const SimpleDialog = ({
  content,
  open,
  handleClose,
  graph,
  transitionTable,
  faData,
}) => {
  const theme = useTheme();

  const states = toStateString('States', faData.states || []);
  const symbols = toStateString('Symbols', faData?.symbols || []);
  const finalStates = toStateString('Final states', faData?.endStates || []);
  return (
    <BaseDialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: '16px', fontWeight: '400' }}>
        Test if a FA is deterministic or non-deterministic
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
        <Box sx={{ marginTop: '20px' }}>
          <Typography>{states}</Typography>
          <Typography>{symbols}</Typography>
          <Typography>{finalStates}</Typography>
        </Box>

        {graph}
        {transitionTable}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          CLose
        </Button>
      </DialogActions>
    </BaseDialog>
  );
};

export default SimpleDialog;
