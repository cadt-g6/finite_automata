import React from 'react';
import BaseDialog from './BaseDialog';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const StringAcceptedDialog = ({
  isAccepted,
  isNfa,
  content,
  open,
  handleClose,
}) => {
  const theme = useTheme();
  return (
    <BaseDialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: '16px', fontWeight: '400' }}>
        Test if a string is accepted by a FA
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          String <b>{content}</b>
          {isAccepted ? 'is accepted' : 'is not accepted'} by
          {isNfa ? 'NFA' : 'DFA'}
        </DialogContentText>
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
