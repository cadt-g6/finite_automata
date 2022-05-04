import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import { getArrayFromValues } from 'utils/form-utils';
import SelectForm from './Fields/SelectForm';
import { Controller } from 'react-hook-form';

const TransitionForm = ({ states, alphabets, control }) => {
  return (
    <div style={{ flex: 1 }}>
      <Typography variant="h6">Transitions</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: '200px',
                  borderRight: '1px solid rgba(224, 224, 224, 1)',
                }}
              ></TableCell>
              {getArrayFromValues(alphabets).map((item, index) => (
                <TableCell
                  key={index}
                  sx={{
                    width: '200px',
                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                  }}
                  align="center"
                >
                  {item === 'E' ? 'ε' : item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getArrayFromValues(states).map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                  }}
                  component="th"
                  scope="row"
                >
                  {row}
                </TableCell>
                {getArrayFromValues(alphabets).map((column, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      width: '200px',
                      borderRight: '1px solid rgba(224, 224, 224, 1)',
                    }}
                  >
                    <Controller
                      name={`${row}${column}`}
                      control={control}
                      render={({ field: { onChange } }) => (
                        <SelectForm
                          size="small"
                          multiple={true}
                          options={getArrayFromValues(states)}
                          onChange={(event, reason, details) =>
                            onChange(reason)
                          }
                        />
                      )}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransitionForm;
