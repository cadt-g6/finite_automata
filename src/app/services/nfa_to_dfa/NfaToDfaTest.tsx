import FaModel from '../../models/FaModel';
import NfaToDfaService from './NfaToDfaService';

//npx ts-node src/app/services/nfa_to_dfa/NfaToDfaTest.tsx

const fa = new FaModel(['q0', 'q1'], ['0', '1'], 'q0', ['q1'], {
  q0: {
    '0': ['q0'],
    '1': ['q0', 'q1'],
  },
  q1: {
    '0': [],
    '1': [],
  },
});

const service = new NfaToDfaService(fa);

console.log(service.exec());
let newFA = service.exec();

for (const iterator of Object.entries(newFA.transitions)) {
  console.log(iterator);
}
