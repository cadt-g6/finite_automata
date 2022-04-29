interface Transitions {
  [k: string]: {
    [k: string]: string[];
  };
}

class FaModel {
  states: string[];
  symbols: string[];
  startState: string;
  endStates: string[];
  transitions?: Transitions;

  constructor(
    state: string[],
    symbols: string[],
    startState: string,
    endStates: string[],
    transitions: Transitions,
  ) {
    this.states = state;
    this.symbols = symbols;
    this.startState = startState;
    this.endStates = endStates;
    this.transitions = transitions;
  }

  isNFA(): Boolean {
    const transitions = this.transitions;
    let isNfa = false;
    for (const state in transitions) {
      for (const symbol in transitions[state]) {
        const symbolTransition = transitions[state][symbol];
        if (symbolTransition.length > 1) isNfa = true;
      }
    }
    return isNfa ? true : false;
  }
}

export default FaModel;
