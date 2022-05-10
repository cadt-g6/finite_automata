import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AlertColor, Slide } from '@mui/material';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type SnackBarType = {
  open: boolean;
  onClose: () => void;
  type: AlertColor;
  content: string;
  [props: string]: any;
};

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const SnackBar = ({ open, onClose, type, content, ...props }: SnackBarType) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        {...props}
        TransitionComponent={TransitionLeft}
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
      >
        <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
          {content}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SnackBar;
