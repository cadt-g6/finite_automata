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

service.exec();

// step1 FA result:
console.log(`\nstep1:`);
console.log(`state: ${service.step1Result?.newFA.states}`);

// step2 FA result:
const step2Result = service.step2Result;
console.log(`\nstep2:`);
console.log(`markedSets1stItr: ${step2Result.markedSets1stItr}`);
console.log(`markedSets2ndItr: ${step2Result.markedSets2ndItr}`);
console.log(`mergedEqualStates: ${step2Result.mergedEqualStates}`);

const step3Result = service.step3Result;
console.log(`\nstep2:`);
console.log(`state: ${step3Result.newFA.states}`);
console.log('transitions:');
for (const iterator of Object.entries(step3Result.newFA.transitions!)) {
  console.log(iterator);
}

console.log(`old: ${fa.states}`);
