import FaModel from '../../models/FaModel';
import Step1MinimizeDfa from './step1/Step1MinimizeDfa';
import Step2MinimizeDfa from './step2/Step2MinimizeDfa';
import Step3MinimizeDfa from './step3/Step3MinimizeDfa';
import Step1Result from './results/Step1Result';
import Step2Result from './results/Step2Result';
import Step3Result from './results/Step3Result';

class MinimizeDFAService {
  fa: FaModel;
  constructor(fa: FaModel) {
    this.fa = fa;
  }

  step1Result!: Step1Result;
  step2Result!: Step2Result;
  step3Result!: Step3Result;

  exec() {
    this.step1Result = new Step1MinimizeDfa(this.fa).exec();
    this.step2Result = new Step2MinimizeDfa(this.step1Result).exec();
    this.step3Result = new Step3MinimizeDfa(this.fa, this.step2Result).exec();
  }
}

export default MinimizeDFAService;
