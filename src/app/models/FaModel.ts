import BaseModel from './BaseModel';

interface Transitions {
  [k: string]: {
    [k: string]: string[];
  };
}

class FaModel extends BaseModel {
  states: string[];
  symbols: string[];
  startState: string;
  endStates: string[];
  transitions: Transitions;
  title?: string;

  constructor(
    states: string[],
    symbols: string[],
    startState: string,
    endStates: string[],
    transitions: Transitions,
    createdAt?: Date,
    updatedAt?: Date,
    title?: string,
  ) {
    super(createdAt, updatedAt);
    this.states = states;
    this.symbols = symbols;
    this.startState = startState;
    this.endStates = endStates;
    this.transitions = transitions;
    this.title = title;
  }

  isNFA(): Boolean {
    const transitions = this.transitions;
    let isNfa = false;
    for (const state in transitions) {
      for (const symbol in transitions[state]) {
        const symbolTransition = transitions[state][symbol];
        if (symbolTransition.length != 1) isNfa = true;
      }
    }
    return isNfa ? true : false;
  }

  //test if string is accepted by DFA
  stringAcceptedByDFA(targetString) {
    let i = 0;
    let nextTransition;
    targetString.split('').every((symbol, index) => {
      if (!this.symbols.includes(symbol)) {
        nextTransition = '';
        return false;
      }
      if (index === 0) {
        nextTransition = this.transitions[this.startState][symbol][0];
        console.log(symbol, 'x', this.startState, '->', nextTransition);
      } else {
        nextTransition = this.transitions[nextTransition][symbol][0];
        console.log(
          symbol,
          'x',
          this.transitions[nextTransition][symbol][0],
          '->',
          nextTransition,
        );
      }
      return true;
    });

    if (this.endStates.includes(nextTransition)) return true;
    else return false;
  }

  //test if string is accepted by NFA
  findAllStates = (
    targetString,
    transitions,
    startStates = this.startState,
    result: any = [],
  ) => {
    let state = startStates;

    // Loop each character of target String
    targetString.split('').every((input, indexString) => {
      // Check if a state has transition with Epsilon
      if (transitions[state]['E'] && transitions[state]['E'].length !== 0) {
        transitions[state]['E'].forEach((transition, index) => {
          this.findAllStates(
            targetString.slice(indexString),
            transitions,
            transitions[state]['E'][index],
            result,
          );
        });
      }

      // Check if there're more than 1 transition of a symbol
      // Then Loop through each transition and Find Possible Outcome states
      if (transitions[state][input].length > 1) {
        transitions[state][input].forEach((transition, index) => {
          this.findAllStates(
            targetString.slice(indexString + 1),
            transitions,
            transitions[state][input][index],
            result,
          );
        });

        state = '';
        return false; // break loop
      } else if (transitions[state][input].length === 0) {
        // If there's no transition, Stop !!
        return false; // break loop
      } else {
        const nextState = transitions[state][input][0];
        state = nextState;
        return true; // continue
      }
    });

    if (state) result.push(state);

    return result;
    // return back every final states
  };

  stringAcceptedByNFA = targetString => {
    const possibleState = this.findAllStates(
      targetString,
      this.transitions,
      this.startState,
    );
    const found = this.endStates.find(val => {
      if (possibleState.includes(val)) {
        return true;
      }
    });
    if (found) return true;
    else return false;
  };
}

export default FaModel;
