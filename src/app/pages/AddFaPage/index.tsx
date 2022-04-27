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
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import Title from './components/Title';
import FormFields from './components/FormFields';
import ValidateChecked from './components/ValidateChecked';
import TransitionForm from './components/TransitionForm';

const StyledContainer = styled('div')({
  width: '70vw',
  padding: '0 24px',
  margin: '32px 0',
});

export function AddFaPage() {
  return (
    <>
      <Helmet>
        <title>AddFaPage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <StyledContainer>
        <Title />
        <Divider sx={{ marginTop: '12px' }} />
        <div style={{ display: 'flex', marginTop: '12px' }}>
          <FormFields />
          <ValidateChecked />
          {/* <TransitionForm /> */}
        </div>
      </StyledContainer>
    </>
  );
}
