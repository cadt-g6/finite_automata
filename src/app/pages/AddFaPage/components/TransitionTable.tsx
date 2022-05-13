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

const TransitionTable = ({ faData }) => {
  const { states, symbols, endStates, startState, transitions } = faData;
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
                  {startState === row
                    ? `-> ${row}`
                    : endStates.includes(row)
                    ? `* ${row}`
                    : `${row}`}
                </TableCell>
                {getArrayFromValues(symbols).map((column, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      width: '200px',
                      borderRight: '1px solid rgba(224, 224, 224, 1)',
                    }}
                  >
                    {transitions[row][column]?.map((nextSymbol, index) => {
                      return index + 1 === transitions[row][column].length
                        ? `${nextSymbol ? nextSymbol : '∅'}`
                        : `${nextSymbol ? nextSymbol : '∅'} ,`;
                    })}
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

export default TransitionTable;
