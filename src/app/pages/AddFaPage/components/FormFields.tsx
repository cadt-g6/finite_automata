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

const FormFields = () => {
  return (
    <div style={{ flex: '1' }}>
      <div style={{ margin: '20px 0 0px 0' }}>
        <Tooltip
          arrow
          title="Please seperate values by comma"
          placement="bottom-end"
        >
          <TextField
            sx={{ width: '100%' }}
            label="States"
            size="small"
            variant="outlined"
          />
        </Tooltip>
      </div>
      <div style={{ margin: '20px 0' }}>
        <TextField
          sx={{ width: '100%' }}
          label="Alphabet"
          size="small"
          variant="outlined"
        />
      </div>
      <div style={{ margin: '20px 0', display: 'flex' }}>
        <FormControl sx={{ minWidth: 120, flex: 1, mr: 2 }}>
          <InputLabel>Initial State</InputLabel>
          <Select size="small" value="1" label="Inital State">
            <MenuItem value="1">q1</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, flex: 1 }}>
          <InputLabel>Final State</InputLabel>
          <Select
            size="small"
            value="2"
            sx={{ with: '100%' }}
            label="Final State"
          >
            <MenuItem value="2">q3</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default FormFields;
