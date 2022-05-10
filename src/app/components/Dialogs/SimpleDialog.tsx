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

const SimpleDialog = ({ content, open, handleClose }) => {
  const theme = useTheme();
  return (
    <BaseDialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: '16px', fontWeight: '400' }}>
        Test if a FA is deterministic or non-deterministic
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
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

export default SimpleDialog;
