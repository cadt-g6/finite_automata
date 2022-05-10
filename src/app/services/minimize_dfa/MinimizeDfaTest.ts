import FaModel from '../../models/FaModel';
import MinimizeDFAService from './MinimizeDfaService';

// npx ts-node src/app/services/minimize_dfa/MinimizeDfaTest.ts
// const fa = new FaModel(
//   ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'],
//   ['a', 'b'],
//   'q0',
//   ['q2'],
//   {
//     q7: {
//       b: ['q2'],
//       a: ['q6'],
//     },
//     q1: {
//       b: ['q2'],
//       a: ['q6'],
//     },
//     q4: {
//       b: ['q5'],
//       a: ['q7'],
//     },
//     q2: {
//       b: ['q2'],
//       a: ['q0'],
//     },
//     q5: {
//       a: ['q2'],
//       b: ['q6'],
//     },
//     q3: {
//       a: ['q2'],
//       b: ['q6'],
//     },
//     q0: {
//       b: ['q5'],
//       a: ['q1'],
//     },
//     q6: {
//       b: ['q4'],
//       a: ['q6'],
//     },
//   },
// );

const fa = new FaModel(
  ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'],
  ['a', 'b'],
  'q0',
  ['q2'],
  {
    q0: {
      a: ['q1'],
      b: ['q5'],
    },
    q4: {
      a: ['q7'],
      b: ['q5'],
    },
    q7: {
      a: ['q6'],
      b: ['q2'],
    },
    q2: {
      a: ['q0'],
      b: ['q2'],
    },
    q3: {
      b: ['q6'],
      a: ['q2'],
    },
    q5: {
      a: ['q2'],
      b: ['q6'],
    },
    q1: {
      a: ['q6'],
      b: ['q2'],
    },
    q6: {
      b: ['q4'],
      a: ['q6'],
    },
  },
);

const service = new MinimizeDFAService(fa);

// original fa
console.log('********************');
console.log(`origin:`);
console.log(`state: ${fa.states}`);
console.log('transitions:');
for (const iterator of Object.entries(fa.transitions!)) {
  console.log(iterator);
}

// step1 FA result:
const step1FaResult = service.step1(fa);
console.log(`\nstep1:`);
console.log(`state: ${step1FaResult.states}`);

// step2 FA result:
const step2FaResult = service.step2(step1FaResult);
console.log(`\nstep2:`);
console.log(`state: ${step2FaResult.states}`);
console.log('transitions:');
for (const iterator of Object.entries(step2FaResult.transitions!)) {
  console.log(iterator);
}
