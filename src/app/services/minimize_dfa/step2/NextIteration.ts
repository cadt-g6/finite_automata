import FaHelper from '../../../helpers/FaHelper';
import FaModel from '../../../models/FaModel';

class NextIteration {
  fa: FaModel;

  mergedEqualStates!: Set<string>;
  startState!: string;
  finalStates!: string[];
  transitions!: {
    [k: string]: {
      [k: string]: string[];
    };
  };

  constructor(fa: FaModel) {
    this.fa = fa;
  }

  exec(_markedSets: Set<string>, _statesSets: Set<string>) {
    let nextMarkedSets = this.getNextMarkedSets(_markedSets, _statesSets);
    let equalPairStates: Set<string> = new Set(
      Array.from(_statesSets).filter(e => !nextMarkedSets.has(e)),
    );

    this.mergedEqualStates = this.mergeEqualStates(equalPairStates);
    let result = this.equalStatesToDfaInfos(this.mergedEqualStates!);

    this.transitions = result['transitions'];
    this.startState = result['startState'];
    this.finalStates = result['finalStates'];
  }

  // find more marked sets that remain after first iteration.
  getNextMarkedSets(
    markedSets: Set<string>,
    statesSets: Set<string>,
  ): Set<string> {
    // Found once but result not yet found or still in remain states
    let tryOnce = new Set<string>();
    let remainStatesSets = new Set<string>(
      Array.from(statesSets).filter(state => !markedSets.has(state)),
    );

    while (remainStatesSets.size > 0) {
      let _statesSets = Array.from(remainStatesSets)[remainStatesSets.size - 1];
      remainStatesSets.delete(_statesSets);

      for (let symbol of this.fa.symbols) {
        let nextStates = this.nextStatesByASymbol(
          new Set(_statesSets.split(',')),
          symbol,
        );
        let nextStatesStr = FaHelper.constructStates(nextStates);

        // have found once & marked
        if (
          !remainStatesSets.has(nextStatesStr) &&
          markedSets.has(nextStatesStr)
        ) {
          markedSets.add(_statesSets);
        } else if (!tryOnce.has(_statesSets)) {
          remainStatesSets.add(nextStatesStr);
          tryOnce.add(_statesSets);
        }
      }
    }

    return markedSets;
  }

  // eg. arguments: states = {q1,q2} & symbol = a
  // q1 ->a-> q4
  // q2 ->a-> q6
  //
  // so, it will return:
  // => {q4,q6}.
  nextStatesByASymbol(states: Set<string>, symbol: string): Set<string> {
    let nextStates = new Set<string>();
    for (let state of Array.from(states)) {
      let result = this.fa.transitions![state][symbol];
      if (result != null) {
        for (const state of result) {
          nextStates.add(state);
        }
      }
    }
    return nextStates;
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

      let key = 'q' + index + "'";
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
                nextStatesList.add('q' + i + "'");
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

  // convert same state together from equalPairStates:
  // eg. equal = {"q1,q2", "q1,q3", "q2,q3"}
  // => {"q1,q2,q3", "q0", "q4"}
  mergeEqualStates(equalPairStates: Set<string>): Set<string> {
    let equalPairsGroup: Set<string> = new Set<string>();
    for (let pair of Array.from(equalPairStates)) {
      let group: Set<string> = new Set<string>();
      let pairInSet: Set<string> = new Set<string>(pair.split(','));

      for (let state of Array.from(pairInSet)) {
        let result = new Set<string>(
          Array.from(equalPairStates).filter(pair => {
            return pair.split(',').includes(state);
          }),
        );

        let splittedStates: Set<string> = new Set(
          Array.from(result).join(',').split(','),
        );

        for (const states of Array.from(splittedStates)) {
          group.add(states);
        }
      }

      equalPairsGroup.add(FaHelper.constructStates(group));
    }

    // q0,q4, q1,q7, q3,q5, which missing q2, q6. let's add them:
    let newStatesWithEqualCombined: Set<string> = new Set(equalPairsGroup);
    let equalStates = new Set(Array.from(equalPairsGroup).join(',').split(','));
    for (let state of this.fa.states) {
      if (!equalStates.has(state)) {
        newStatesWithEqualCombined.add(state);
      }
    }

    return newStatesWithEqualCombined;
  }
}

export default NextIteration;
