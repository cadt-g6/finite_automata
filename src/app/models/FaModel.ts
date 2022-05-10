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
        if (symbolTransition.length != 1) isNfa = true;
      }
    }
    return isNfa ? true : false;
  }

  nfatodfa(): any {
    let nfa:any = JSON.parse(JSON.stringify(this.transitions));
    let nfa_state:string[] = this.states.slice();
    let dfa_state:string[] = this.states.slice();
    let path:string[] = this.symbols.slice();
    let nfa_end_state:string[] = this.endStates.slice();
    let dfa_end_state:string[] = this.endStates.slice();

    console.log("nfa_state", nfa_state)
    console.log("path", path)
    console.log("nfa_end_state",nfa_end_state)
    console.log("nfa_transition",nfa)

    //generate all dfa state
    nfa_state.forEach(function(i,indexi){
      for(const j in nfa[i]){
        let t = ''
        let check_end_state = false
        nfa[i][j].forEach(function(k,indexk){
          if (nfa_end_state.includes(k)){
            check_end_state = true
          }
          t=t+k
        })
        if (check_end_state && !dfa_end_state.includes(t)){
          dfa_end_state.push(t)
        }
        if (!dfa_state.includes(t) && t.length > 0){
          dfa_state.push(t)
        }
      }
    })
    // console.log("dfa_state",dfa_state)
    
    //set transition to dfa
    let dfa_transition:any = {}
    nfa_state.forEach(function(i,indexi){
      dfa_transition[i]={}
      for(const j in nfa[i]){
        let t = ''
        nfa[i][j].forEach(function(k,indexk){
          t=t+k
        })
        dfa_transition[i][j]=t
      }
    })
    
    let dfa_state_n = dfa_state.filter(val => !nfa_state.includes(val));
    
    //set transition to new generated state
    dfa_state_n.forEach(function(i,indexi){
      dfa_transition[i]={}
      path.forEach(function(j,indexj){
        dfa_transition[i][j]=i
      })
    })

    let dfa:any = {
      states: dfa_state.slice(),
      symbols: path.slice(),
      startState: this.startState,
      endStates: dfa_end_state.slice(),
      transitions: JSON.parse(JSON.stringify(dfa_transition))
    }

    console.log("Final dfa",dfa)

    return dfa;
  }
  //test if string is accepted by DFA
  stringAcceptedByDFA(targetString, transitions) {
    let i = 0;
    let nextTransition;
    targetString.split('').forEach(symbol => {
      if (i == 0) {
        nextTransition = transitions[this.startState][symbol][0];
        console.log(symbol, 'x', this.startState, '->', nextTransition);
        i++;
      } else {
        nextTransition = transitions[nextTransition][symbol][0];
        console.log(
          symbol,
          'x',
          transitions[nextTransition][symbol][0],
          '->',
          nextTransition,
        );
        i++;
      }
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

  stringAcceptedByNFA = (targetString, transitions) => {
    const possibleState = this.findAllStates(
      targetString,
      transitions,
      this.startState,
    );
    console.log(possibleState);
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
