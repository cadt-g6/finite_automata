import FaModel from '../../../models/FaModel';
import Step2Result from '../results/Step2Result';
import Step3Result from '../results/Step3Result';

// Construct the minimized DFA.
class Step3MinimizeDfa {
  fa: FaModel;
  step2: Step2Result;
  prefix: string = 'Q';

  constructor(fa: FaModel, step2: Step2Result) {
    this.step2 = Object.assign({}, step2);
    this.fa = Object.assign({}, fa);
  }

  exec(): Step3Result {
    let result = this.equalStatesToDfaInfos(
      new Set(this.step2.mergedEqualStates!),
    );

    this.fa.transitions = result['transitions'];
    this.fa.startState = result['startState'];
    this.fa.endStates = result['finalStates'];

    let states: string[] = [];
    for (const state in this.fa.transitions) {
      states.push(state);
    }

    this.fa.states = states;
    return new Step3Result(this.fa);
  }

  // return new transition, start state & final state from mergedEqualStates.
  // => [transitions, startState, finalStates]
  equalStatesToDfaInfos(mergedEqualStates: Set<string>) {
    let transitions: { [k: string]: { [k: string]: string[] } } = {};
    let startState = '';
    let finalStates: string[] = [];

    let mergedEqualStatesArr = Array.from(mergedEqualStates);
    for (const index in mergedEqualStatesArr) {
      let statesStr = mergedEqualStatesArr[index];
      let states = new Set(statesStr.split(','));

      let key = this.prefix + index;
      if (!transitions[key]) transitions[key] = {};

      for (let symbol of this.fa.symbols) {
        let nextStatesList = new Set<string>();
        for (let state of Array.from(states)) {
          let nextStates = this.fa.transitions![state][symbol].join(',');
          for (let _state of nextStates?.split(',') ?? []) {
            for (const i in Array.from(mergedEqualStates)) {
              if (
                Array.from(mergedEqualStates)
                  [i].toString()
                  .split(',')
                  .includes(_state)
              ) {
                nextStatesList.add(this.prefix + i);
              }
            }
          }
        }

        transitions[key][symbol] = Array.from(nextStatesList)
          .join(',')
          .split(',');
      }

      // find startState
      if (states.has(this.fa.startState)) startState = key;

      // find finalStates
      for (let state of this.fa.endStates) {
        if (states.has(state)) {
          finalStates.push(key);
        }
      }
    }

    return {
      transitions,
      startState,
      finalStates,
    };
  }
}

export default Step3MinimizeDfa;
