import FaModel from '../../../models/FaModel';
import FirstIteration from './FirstIteration';
import NextIteration from './NextIteration';

class Step2MinimizeDfa {
  fa: FaModel;
  firstIteration: FirstIteration;
  nextIteration: NextIteration;

  constructor(fa: FaModel) {
    this.fa = fa;
    this.firstIteration = new FirstIteration(fa);
    this.nextIteration = new NextIteration(fa);
  }

  exec(): FaModel {
    this.firstIteration.exec();
    this.nextIteration.exec(
      this.firstIteration.markedSets,
      this.firstIteration.statesSets,
    );

    this.fa.startState = this.nextIteration!.startState;
    this.fa.endStates = this.nextIteration!.finalStates;
    this.fa.transitions = this.nextIteration!.transitions;

    return this.fa;
  }
}

export default Step2MinimizeDfa;
