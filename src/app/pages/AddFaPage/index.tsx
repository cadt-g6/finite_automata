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

import CreateFa from './components/CreateFa';

const StyledContainer = styled('div')({
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
        <CreateFa />
      </StyledContainer>
    </>
  );
}
