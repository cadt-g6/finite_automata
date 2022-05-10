import FaModel from '../models/FaModel';
import Step1MinimizeDfa from './minimize_dfa/step1/Step1MinimizeDfa';
import Step2MinimizeDfa from './minimize_dfa/step2/Step2MinimizeDfa';


class MinimizeDFAService {
  fa: FaModel;
  constructor(fa: FaModel) {
    this.fa = fa;
  }

  cachedStep1Service!: Step1MinimizeDfa;
  cachedStep2Service!: Step2MinimizeDfa;

  step1(fa: FaModel): FaModel {
    this.cachedStep1Service = new Step1MinimizeDfa(fa);
    fa = this.cachedStep1Service.exec();
    return fa;
  }

  step2(fa: FaModel): FaModel {
    this.cachedStep2Service = new Step2MinimizeDfa(fa);
    fa = this.cachedStep2Service!.exec();
    return fa;
  }
}

export default MinimizeDFAService;

// npx ts-node src/app/services/minimizeDFAService.ts
const fa = new FaModel(
  ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'],
  ['a', 'b'],
  'q0',
  ['q2'],
  {
    q7: {
      b: ['q2'],
      a: ['q6'],
    },
    q1: {
      b: ['q2'],
      a: ['q6'],
    },
    q4: {
      b: ['q5'],
      a: ['q7'],
    },
    q2: {
      b: ['q2'],
      a: ['q0'],
    },
    q5: {
      a: ['q2'],
      b: ['q6'],
    },
    q3: {
      a: ['q2'],
      b: ['q6'],
    },
    q0: {
      b: ['q5'],
      a: ['q1'],
    },
    q6: {
      b: ['q4'],
      a: ['q6'],
    },
  },
);

const service = new MinimizeDFAService(fa);
const newFa = service.step1(fa);

console.log(newFa.states);
