import React from 'react';
import {
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  styled,
} from '@mui/material';

const ValidateChecked = ({ states, alphabets, initialState, endStates }) => {
  return (
    <div style={{ flex: 1 }}>
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
            control={<Checkbox size="small" checked={states ? true : false} />}
            label="Add states"
          />

          <FormControlLabel
            control={
              <Checkbox size="small" checked={alphabets ? true : false} />
            }
            label="Add alphabets"
          />
          <FormControlLabel
            control={
              <Checkbox size="small" checked={initialState ? true : false} />
            }
            label="Set initial state"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={endStates && endStates.length > 0 ? true : false}
              />
            }
            label="Set final state"
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default ValidateChecked;
