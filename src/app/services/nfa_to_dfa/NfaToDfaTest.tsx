import FaModel from '../../models/FaModel';
import NfaToDfaService from './NfaToDfaService';

//npx ts-node src/app/services/nfa_to_dfa/NfaToDfaTest.tsx

const fa = new FaModel(['q0', 'q1', 'q2'], ['0', '1', 'E'], 'q0', ['q1'], {
  q0: {
    '0': ['q0'],
    '1': ['q2'],
    E: ['q1'],
  },
  q1: {
    '0': [],
    '1': [],
    E: [],
  },
  q2: {
    '0': [],
    '1': ['q1', 'q2'],
    E: [],
  },
});

const service = new NfaToDfaService(fa);

console.log(service.exec());
let newFA = service.exec();

for (const iterator of Object.entries(newFA.transitions)) {
  console.log(iterator);
}
