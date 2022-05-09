import FaModel from 'app/models/FaModel';
import Step1MinimizeDfa from './minimize_dfa/step1MinimizeDfa';
import Step2MinimizeDfa from './minimize_dfa/step2MinimizeDfa';

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
