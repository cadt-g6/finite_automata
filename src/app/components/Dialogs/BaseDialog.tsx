import React from 'react';

import { Dialog } from '@mui/material';

type BaseDialogType = {
  open: boolean;
  onClose: () => void;
  children: any;
  [props: string]: any;
};

const BaseDialog = ({ open, onClose, children, ...props }: BaseDialogType) => (
  <Dialog
    {...props}
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    {children}
  </Dialog>
);

export default BaseDialog;
