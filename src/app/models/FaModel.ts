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
}

export default FaModel;
