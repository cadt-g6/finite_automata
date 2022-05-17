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
    id?: string,
  ) {
    super(id, createdAt, updatedAt);
    this.states = states;
    this.symbols = symbols;
    this.startState = startState;
    this.endStates = endStates;
    this.title = title;
    this.transitions = this.validateTransition(states, transitions);
  }

  copyWith(
    states: string[],
    symbols: string[],
    startState: string,
    endStates: string[],
    transitions: Transitions,
    createdAt?: Date,
    updatedAt?: Date,
    title?: string,
    id?: string,
  ): FaModel {
    this.id = id || this.id;
    this.createdAt = createdAt ? createdAt.toUTCString() : this.createdAt;
    this.updatedAt = updatedAt ? updatedAt.toUTCString() : this.updatedAt;
    this.states = states || this.states;
    this.symbols = symbols || this.symbols;
    this.startState = startState || this.startState;
    this.endStates = endStates || this.endStates;
    this.title = title || this.title;
    this.transitions = transitions || this.transitions;
    return this;
  }

  // set default to missing transition
  validateTransition(states: string[], transitions: Transitions): Transitions {
    let validatedTransition: Transitions = {};

    for (const state in transitions) {
      if (states.includes(state)) {
        validatedTransition[state] = {};
        if (!transitions[state]) {
          for (const symbol in transitions[state]) {
            validatedTransition[state][symbol] = [];
          }
        } else {
          for (const symbol in transitions[state]) {
            if (!transitions[state][symbol]) {
              transitions[state][symbol] = [];
            }
            validatedTransition[state][symbol] = transitions[state][symbol];
          }
        }
      }

      for (const symbol in transitions[state]) {
        if (validatedTransition[state] && validatedTransition[state][symbol]) {
          validatedTransition[state][symbol] = validatedTransition[state][
            symbol
          ].filter(e => e !== '');
        }
      }
    }

    this.transitions = validatedTransition;
    return validatedTransition;
  }

  isNFA(): Boolean {
    const transitions = this.transitions;
    let isNfa = false;
    if (this.symbols.includes('E')) return true;
    for (const state in transitions) {
      for (const symbol in transitions[state]) {
        const symbolTransition = transitions[state][symbol];
        if (symbolTransition.length !== 1) isNfa = true;
      }
    }
    return isNfa ? true : false;
  }

  //test if string is accepted by DFA
  stringAcceptedByDFA(targetString) {
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
      if (!this.symbols.includes(input)) {
        state = '';
        result = [];
        return false;
      }
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
      console.log(transitions[state][input]);
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

  toDotString = () => {
    let dotStr = 'digraph fsm {\n';
    dotStr += 'rankdir=LR;\n';
    dotStr += 'size="8,5";\n';
    dotStr += 'node [shape = point]; INITIAL_STATE\n';
    dotStr +=
      'node [shape = doublecircle]; ' + this.endStates.join(',') + ';\n';
    dotStr += 'node [shape = circle];\n';
    dotStr += 'INITIAL_STATE -> ' + this.startState + ';\n';

    for (const state in this.transitions) {
      for (const symbol in this.transitions[state]) {
        if (this.transitions[state][symbol].length > 0) {
          this.transitions[state][symbol].forEach(nextState => {
            if (nextState) {
              dotStr += '' + state + ' -> ';
              dotStr += nextState;
              dotStr +=
                ' ' + '[label=' + (symbol === 'E' ? 'ε' : symbol) + '];\n';
            }
          });
        }
      }
    }

    dotStr += '}';

    return dotStr;
  };
}

export default FaModel;
