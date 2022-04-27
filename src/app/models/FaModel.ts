interface Transitions {
  [k: string]: {
    [k: string]: string[];
  };
}

class FaModel {
  state: string[];
  symbols: string[];
  startState: string;
  endState: string[];
  transitions?: Transitions;

  constructor(
    state: string[],
    symbols: string[],
    startState: string,
    endState: string[],
    transitions: Transitions,
  ) {
    this.state = state;
    this.symbols = symbols;
    this.startState = startState;
    this.endState = endState;
    this.transitions = transitions;
  }
}

export default FaModel;
