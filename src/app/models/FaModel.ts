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
  nfatodfa_epsilon(): any {
    let nfa: any = JSON.parse(JSON.stringify(this.transitions));
    let nfa_start_state: string = this.startState;
    let nfa_end_state: string[] = this.endStates.slice();
    let path: string[] = this.symbols.slice();

    let dfa: any = {};
    let dfa_transition: any = {};
    let dfa_state: string[] = [];
    let dfa_state_test: string[] = [];
    let dfa_start_state: string = '';
    let dfa_end_state: string[] = [];
    let dfa_path: string[] = path.slice();

    // //delete epsilon symbol from dfa_path
    if (dfa_path.includes('E')) {
      dfa_path.splice(dfa_path.indexOf('E'), 1);
    }
    // console.log("dfa_path",dfa_path)

    //find state that have epsilon path
    let epsilon_state: string[] = [];
    for (const i in nfa) {
      if (nfa[i]['E'] && nfa[i]['E'].length > 0) epsilon_state.push(i);
    }
    // console.log("Epsilon_state:" ,epsilon_state)

    //find transition of epsilon_state
    let epsilon_state_transition: any = {};
    epsilon_state.forEach(function (i, iindex) {
      epsilon_state_transition[i] = {};
      epsilon_state_transition[i]['E'] = nfa[i]['E'];
    });
    // console.log("Epsilon_state_transition:",epsilon_state_transition)

    //find dfa start state
    if (epsilon_state.includes(nfa_start_state)) {
      let list_tmp_state: string[] = [];
      list_tmp_state.push(nfa_start_state);

      let tmp_state: string = '';

      //test state with epsilon
      epsilon_state_transition[nfa_start_state]['E'].forEach(function (
        i,
        iindex,
      ) {
        if (!list_tmp_state.includes(i)) {
          list_tmp_state.push(i);
        }
        // console.log("i",i)
      });
      // console.log("list_tmp_state",list_tmp_state)

      list_tmp_state.sort();
      list_tmp_state.forEach(function (i, index) {
        tmp_state = tmp_state + i;
      });

      dfa_start_state = tmp_state;
      dfa_state_test.push(tmp_state);
    } else {
      let tmp_state: string = nfa_start_state;
      let list_tmp_state: string[] = [];
      list_tmp_state.push(nfa_start_state);
      dfa_start_state = tmp_state;
      dfa_state_test.push(tmp_state);
    }

    // console.log("dfa start state", dfa_start_state)

    let testcheck = 0;

    //Generate dfa_state and dfa_transition
    while (dfa_state_test.length > 0) {
      let i = dfa_state_test[testcheck];
      if (!i) break;
      dfa_transition[i] = {};
      let list_tmp_state: string[] = [];
      let list_tmp_state2: string[] = [];
      let tmp_state: string = '';

      // Check each transition
      dfa_path.forEach(function (j, jindex) {
        list_tmp_state = [];
        list_tmp_state2 = [];
        tmp_state = '';
        let arry = i.split(/(..)/g).filter(s => s);
        arry.forEach(function (y, yindex) {
          Array.isArray(nfa[y][j]) &&
            nfa[y][j].forEach(function (k, kindex) {
              if (epsilon_state.includes(k)) {
                epsilon_state_transition[k]['E'].forEach(function (x, xindex) {
                  list_tmp_state.push(k);
                  list_tmp_state.push(x);
                });
              } else list_tmp_state.push(k);
            });
        });

        list_tmp_state.forEach(element => {
          if (!list_tmp_state2.includes(element)) list_tmp_state2.push(element);
        });
        list_tmp_state = [];
        list_tmp_state = list_tmp_state2;
        list_tmp_state.sort();

        let check_end_state = false;
        list_tmp_state.forEach(function (z, zindex) {
          if (nfa_end_state.includes(z)) check_end_state = true;
          tmp_state = tmp_state + z;
        });

        if (check_end_state && !dfa_end_state.includes(tmp_state))
          dfa_end_state.push(tmp_state);
        dfa_transition[i][j] = [tmp_state];

        if (dfa_state_test.includes(tmp_state) == false)
          dfa_state_test.push(tmp_state);
      });
      dfa_state.push(i);

      testcheck += 1;
    }
    dfa_state.sort();

    // Create dfa object
    dfa = new FaModel(
      dfa_state.slice(),
      dfa_path.slice(),
      dfa_start_state.slice(),
      dfa_end_state.slice(),
      JSON.parse(JSON.stringify(dfa_transition)),
    );

    console.log('Final dfa', dfa);

    return dfa;
  }
  nfatodfa_nonepsilon(): any {
    let nfa: any = JSON.parse(JSON.stringify(this.transitions));
    let nfa_state: string[] = this.states.slice();
    let dfa_state: string[] = this.states.slice();
    let path: string[] = this.symbols.slice();
    let nfa_end_state: string[] = this.endStates.slice();
    let dfa_end_state: string[] = this.endStates.slice();

    // console.log("nfa_state", nfa_state)
    // console.log("path", path)
    // console.log("nfa_end_state",nfa_end_state)
    // console.log("nfa_transition",nfa)

    //generate all dfa state
    nfa_state.forEach(function (i, indexi) {
      for (const j in nfa[i]) {
        let t = '';
        let check_end_state = false;
        nfa[i][j].forEach(function (k, indexk) {
          if (nfa_end_state.includes(k)) {
            check_end_state = true;
          }
          t = t + k;
        });
        if (check_end_state && !dfa_end_state.includes(t)) {
          dfa_end_state.push(t);
        }
        if (!dfa_state.includes(t) && t.length > 0) {
          dfa_state.push(t);
        }
      }
    });
    // console.log("dfa_state",dfa_state)

    //set transition to dfa
    let dfa_transition: any = {};
    nfa_state.forEach(function (i, indexi) {
      dfa_transition[i] = {};
      for (const j in nfa[i]) {
        let t = '';
        nfa[i][j].forEach(function (k, indexk) {
          t = t + k;
        });
        dfa_transition[i][j] = [t];
      }
    });

    let dfa_state_n = dfa_state.filter(val => !nfa_state.includes(val));

    //set transition to new generated state
    dfa_state_n.forEach(function (i, indexi) {
      dfa_transition[i] = {};
      path.forEach(function (j, indexj) {
        dfa_transition[i][j] = [i];
      });
    });
    console.log(dfa_transition);

    let dfa: any = new FaModel(
      dfa_state.slice(),
      path.slice(),
      this.startState,
      dfa_end_state.slice(),
      JSON.parse(JSON.stringify(dfa_transition)),
    );

    console.log('Final dfa', dfa);

    return dfa;
  }

  nfatodfa(): any {
    let path: string[] = this.symbols.slice();

    let dfa: any = {};

    if (path.includes('E')) {
      dfa = this.nfatodfa_epsilon();
    } else {
      dfa = this.nfatodfa_nonepsilon();
    }

    return dfa;
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
        if (this.transitions[state][symbol].length) {
          this.transitions[state][symbol].forEach(nextState => {
            dotStr += '' + state + ' -> ';
            dotStr += nextState;
            dotStr += ' ' + '[label=' + symbol === 'E' ? 'ε' : symbol + '];\n';
          });
        }
      }
    }

    dotStr += '}';

    return dotStr;
  };
}

export default FaModel;
