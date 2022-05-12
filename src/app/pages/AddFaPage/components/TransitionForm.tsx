import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, TextField } from '@mui/material';
import { getArrayFromValues } from 'utils/form-utils';
import SelectForm from './Fields/SelectForm';
import { Controller } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

const TransitionForm = ({ states, symbols, control }) => {
  const location = useLocation();
  return (
    <Box
      sx={theme => ({
        marginTop: '40px',
        marginLeft: '20px',
        [theme.breakpoints.down('md')]: { marginLeft: '0' },
      })}
    >
      <TableContainer component={Paper} variant="outlined">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: '200px',
                  borderRight: '1px solid rgba(224, 224, 224, 1)',
                }}
              >
                Q&sum;
              </TableCell>
              {getArrayFromValues(symbols).map((item, index) => (
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
                {getArrayFromValues(symbols).map((column, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      width: '200px',
                      borderRight: '1px solid rgba(224, 224, 224, 1)',
                    }}
                  >
                    {location.pathname !== '/add' ? (
                      <Controller
                        name={`${row}${column}`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <SelectForm
                            size="small"
                            multiple={true}
                            options={getArrayFromValues(states)}
                            value={value}
                            onChange={(event, reason, details) =>
                              onChange(reason)
                            }
                          />
                        )}
                      />
                    ) : (
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
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransitionForm;
