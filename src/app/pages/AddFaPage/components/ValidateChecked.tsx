import React from 'react';
import {
  Container,
  Typography,
  Tooltip,
  Button,
  Divider,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  styled,
} from '@mui/material';

const ValidateChecked = () => {
  return (
    <div style={{ flex: 1, marginLeft: '24px' }}>
      <Typography variant="subtitle2">Transitions</Typography>
      <Typography
        sx={{ fontSize: '12px', marginTop: '14px' }}
        variant="subtitle1"
      >
        Please complete the check list to edit transition
      </Typography>
      <div>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox size="small" checked />}
            label="Add states"
          />

          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Add alphabets"
          />
          <FormControlLabel
            control={<Checkbox size="small" defaultChecked />}
            label="Set initial state"
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Set final state"
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default ValidateChecked;
