import FaHelper from '../../../helpers/FaHelper';
import FaModel from '../../../models/FaModel';
import Step1Result from '../results/Step1Result';

// Remove none accessible states
class Step1MinimizeDfa {
  fa: FaModel;
  constructor(fa: FaModel) {
    this.fa = fa;
  }

  exec(): Step1Result {
    let initialNextStates = FaHelper.findNextStateFromSingleState(
      this.fa.startState,
      this.fa,
    );

    let remainStates = new Set(initialNextStates);
    let accessibleStates = new Set(initialNextStates);
    accessibleStates.add(this.fa.startState);

    while (remainStates.size) {
      let nextStates = FaHelper.findNextStates(remainStates, this.fa);
      // remove if it already accessible before adding to remain
      nextStates = FaHelper.removeWhereSet(
        nextStates,
        state => !accessibleStates.has(state),
      );

      remainStates.clear();
      for (const state of Array.from(nextStates)) {
        accessibleStates.add(state);
        remainStates.add(state);
      }
    }

    // construct new transition
    let transitions = {};
    for (let state in this.fa.transitions!) {
      if (accessibleStates.has(state)) {
        transitions[state] = this.fa.transitions![state];
      }
    }

    this.fa.transitions = transitions;
    this.fa.states = Array.from(FaHelper.sortStates(accessibleStates));

    return new Step1Result(
      this.fa.states.filter(e => !Array.from(accessibleStates).includes(e)),
      Array.from(accessibleStates),
      this.fa,
    );
  }
}

export default Step1MinimizeDfa;
