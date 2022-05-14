import React from 'react';
import BaseDialog from './BaseDialog';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
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
  IconButton,
  Avatar,
} from '@mui/material';

import { toStateString } from 'utils/string-utils';

const StringAcceptedDialog = ({
  isAccepted,
  isNfa,
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
      <DialogTitle
        sx={{
          fontSize: '16px',
          fontWeight: '400',
          postition: 'relative',
          width: '100%',
        }}
      >
        Test if a string is accepted by a FA
        <Avatar
          sx={{
            position: 'absolute',
            backgroundColor: isAccepted
              ? theme.palette.success.main
              : theme.palette.error.main,
            right: '24px',
            top: '24px',
          }}
        >
          {isAccepted ? <CheckIcon /> : <CloseIcon />}
        </Avatar>
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          String <b>{content}</b>
          {isAccepted ? ' is accepted' : ' is rejected'} by
          {isNfa ? ' NFA' : ' DFA'}
        </DialogContentText>
        {graph}
        <Box sx={{ marginTop: '20px' }}>
          <Typography>{states}</Typography>
          <Typography>{symbols}</Typography>
          <Typography>{finalStates}</Typography>
        </Box>
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

export default StringAcceptedDialog;
