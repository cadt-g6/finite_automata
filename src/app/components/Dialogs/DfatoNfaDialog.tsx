import React from 'react';
import BaseDialog from './BaseDialog';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
  Box,
  useTheme,
} from '@mui/material';
import { toStateString } from 'utils/string-utils';
import FaModel from 'app/models/FaModel';
import Graphviz from 'graphviz-react';
import TransitionTable from 'app/pages/AddFaPage/components/TransitionTable';
import NfaToDfaService from 'app/services/nfa_to_dfa/NfaToDfaService';

const DfatoNfaDialog = ({
  content,
  open,
  handleClose,
  graph,
  transitionTable,
  faData,
}) => {
  const theme = useTheme();
  const service = new NfaToDfaService(faData);

  const states = toStateString('States', faData.states || []);
  const symbols = toStateString('Symbols', faData?.symbols || []);
  const finalStates = toStateString('Final states', faData?.endStates || []);
  const newDfa = service.exec();

  const newStates = toStateString('States', newDfa.states || []);
  const newSymbols = toStateString('Symbols', newDfa?.symbols || []);
  const newFinalStates = toStateString('Final states', newDfa?.endStates || []);
  return (
    <BaseDialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: '16px', fontWeight: '400' }}>
        NFA to DFA
      </DialogTitle>

      <DialogContent>
        <Box sx={{ marginTop: '20px' }}>
          <Typography>{states}</Typography>
          <Typography>{symbols}</Typography>
          <Typography>{finalStates}</Typography>

          {graph}
          {transitionTable}
        </Box>
        <Typography variant="h6" sx={{ marginTop: '20px' }}>
          After Convert
        </Typography>
        <Box sx={{ marginTop: '20px' }}>
          <Typography>{newStates}</Typography>
          <Typography>{newSymbols}</Typography>
          <Typography>{newFinalStates}</Typography>

          <Graphviz dot={newDfa.toDotString()} options={{ height: '200px' }} />
          <TransitionTable faData={newDfa} />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          CLose
        </Button>
      </DialogActions>
    </BaseDialog>
  );
};

export default DfatoNfaDialog;
