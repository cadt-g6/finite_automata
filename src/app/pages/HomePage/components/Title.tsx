import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import AddIcon from '@mui/icons-material/Add';
import {
  Typography,
  styled,
  ToggleButtonGroup,
  ToggleButton,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  Grid,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
}));

const ActionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  gap: '14px',
  justifyContent: 'flex-end',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    marginTop: '12px',
    justifyContent: 'flex-start',
  },
}));

const Title = ({ sortBy, setSortBy, orderBy, setOrderBy }) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={6} lg={7.5} md={6}>
        <Typography sx={{ flex: 3, fontSize: '24px' }}>
          Finite Automata
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} lg={4.5} md={6}>
        <ActionContainer>
          <ToggleButtonGroup
            size="small"
            value="justify"
            orientation="horizontal"
          >
            <ToggleButton value="module">
              <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton value="justify">
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <form>
            <FormControl>
              <InputLabel>Sort</InputLabel>
              <Select
                label="Sort"
                size="small"
                onChange={e => setSortBy(e.target.value)}
                value={sortBy}
              >
                <MenuItem value="title">FA Title</MenuItem>
                <MenuItem value="created_at">Created Date</MenuItem>
                <MenuItem value="updated_at">Recently Update</MenuItem>
              </Select>
            </FormControl>{' '}
          </form>
          <form>
            <FormControl>
              <Select
                size="small"
                onChange={e => setOrderBy(e.target.value)}
                value={orderBy}
              >
                <MenuItem value="asc">A-Z</MenuItem>
                <MenuItem value="desc">Z-A</MenuItem>
              </Select>
            </FormControl>{' '}
          </form>

          <Link to="/add">
            <Button
              sx={{ backgroundColor: '#192849' }}
              variant="contained"
              startIcon={<AddIcon />}
            >
              ADD
            </Button>
          </Link>
        </ActionContainer>
      </Grid>
    </Grid>
  );
};

export default Title;
