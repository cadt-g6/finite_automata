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

    //generate all dfa state
    nfa_state.forEach(function(i,indexi){
      for(const j in nfa[i]){
        let t = ''
        nfa[i][j].forEach(function(k,indexk){
          t=t+k
        })
        if (!dfa_state.includes(t) && t.toLowerCase() != 'null'){
          dfa_state.push(t)
        }
      }
    })
    
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
      endStates: this.endStates.slice(),
      transitions: JSON.parse(JSON.stringify(dfa_transition))
    }

    // console.log(dfa)

    return dfa;
  }
}

export default FaModel;
