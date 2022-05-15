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

const DeleteDialog = ({ content, open, handleClose, onDelete }) => {
  const theme = useTheme();

  return (
    <BaseDialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: '16px', fontWeight: '400' }}>
        Are you sure you want to delete this data ?
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
        <Button onClick={onDelete}>Delete</Button>
      </DialogActions>
    </BaseDialog>
  );
};

export default DeleteDialog;
