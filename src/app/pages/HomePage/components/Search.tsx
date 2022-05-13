import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';

const Search = ({ onSearch }) => {
  return (
    <Grid item xs={12} md={3}>
      <TextField
        label="Search by title"
        size="medium"
        fullWidth
        onChange={onSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default Search;
