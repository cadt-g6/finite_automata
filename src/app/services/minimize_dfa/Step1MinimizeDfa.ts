import FaModel from 'app/models/FaModel';

class Step1MinimizeDfa {
  fa: FaModel;
  constructor(fa: FaModel) {
    this.fa = fa;
  }

  exec(): FaModel {
    return this.fa;
  }
}

export default Step1MinimizeDfa;
