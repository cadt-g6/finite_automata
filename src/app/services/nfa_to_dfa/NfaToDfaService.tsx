import FaModel from '../../models/FaModel';
import * as _ from 'lodash';

class ConvertNFAtoDFA {
  fa: FaModel;

  constructor(fa: FaModel) {
    this.fa = Object.assign({}, fa);
  }

  exec() {
    return convertNFAtoDFA(this.fa);
  }
}

const epsilonClosure = (states: string[], epsilonTransition: any) => {
  let result = states;
  for (let state of states) {
    let canDoEpsilonClosure = Object.keys(epsilonTransition).includes(state);
    if (canDoEpsilonClosure) {
      result = _.uniq([...states, ...epsilonTransition[state]]);
    }
  }
  return result;
};

const findEpsilonTransition = (fa: FaModel) => {
  let epsilonTran = {};
  if (!fa.symbols.includes('E')) return epsilonTran;
  for (const state of fa.states) {
    const isHasEpsilonTransition: boolean =
      fa.transitions[state]['E'].length !== 0;
    if (isHasEpsilonTransition) {
      epsilonTran[state] = fa.transitions[state]['E'];
    }
  }
  return epsilonTran;
};

const transitionBySetOfStates = (states: string[], nfa: FaModel) => {
  let resultState = {};
  let newSymbols = [...nfa.symbols];
  newSymbols = newSymbols.filter(symbol => symbol !== 'E');
  let epsilonTransition = findEpsilonTransition(nfa);
  console.log('state: ', states);
  for (var symbol of newSymbols) {
    let transitionResult = [];
    if (states.length === 0) {
      resultState[symbol] = [];
    } else {
      for (var state of states) {
        transitionResult = _.uniq([
          ...transitionResult,
          ...nfa.transitions[state][symbol],
        ]);
        let epsilonClosureTransition = epsilonClosure(
          transitionResult,
          epsilonTransition,
        );
        epsilonClosureTransition = epsilonClosureTransition.sort();
        resultState[symbol] = epsilonClosureTransition;
      }
    }
  }
  console.log('a : ', resultState['a']);
  console.log('b : ', resultState['b']);
  return resultState;
};

const convertNFAtoDFA = (nfa: FaModel) => {
  let newTransition = {};

  let newSymbols = [...nfa.symbols];
  newSymbols = newSymbols.filter(symbol => symbol !== 'E');

  let epsilonTransition = findEpsilonTransition(nfa);
  let q0Prime = epsilonClosure([nfa.startState], epsilonTransition);
  let newState = [q0Prime];
  let newStateHistory = _.uniq([...newState]);
  newTransition[q0Prime.toString()] = {};

  while (newState.length !== 0) {
    var newTransitionKeys = Object.keys(newTransition);
    let setOfStates = newState[0];

    newTransitionKeys.forEach(k => {
      if (!Object.keys(newTransition[k]).length) {
        console.log('*********************');
        // Do the transition function
        var tranResult = transitionBySetOfStates(setOfStates, nfa);
        newTransition[k.toString()] = tranResult;

        // Find another transition with the new state get from previouse transition
        for (var symbol of newSymbols) {
          let tranBySymbol = tranResult[symbol] ?? [];
          tranBySymbol.sort();
          const isExisted = Object.keys(newTransition).includes(
            tranBySymbol.toString(),
          );

          if (!isExisted) {
            newState = _.uniq([...newState, tranBySymbol]);
            newStateHistory = _.uniq([...newStateHistory, ...newState]);
            newTransition[tranBySymbol.toString()] = {};
          }
        }
        if (newState.length > 1) setOfStates = newState[1];
        if (newState.length !== 0) newState.shift();
        console.log('remain state: ', newState);
      }
    });
  }

  console.log('Answer: ', newTransition);
  return constructNewDFA(
    nfa.symbols,
    q0Prime,
    nfa.endStates,
    newStateHistory,
    newTransition,
  );
};

const constructNewDFA = (
  symbols: string[],
  startState: string[],
  finalStates: string[],
  newStateHistory: any,
  transition: any,
) => {
  let newStates: any = [];
  let newStartState;
  let newFinalState;
  let prevFinalState: any = [];
  let listStates = {};
  let newTransition = {};

  let newSymbols = [...symbols];
  newSymbols = newSymbols.filter(symbol => symbol !== 'E');

  let index = 0;
  console.log(newStateHistory, 'new State History');
  newStateHistory.forEach(setOfState => {
    listStates[setOfState.toString()] = 'Q' + index;
    // let isFinalState = setOfState.toSet().intersection(finalStates.toSet()).toList().isNotEmpty;
    let isFinalState = _.intersection(setOfState, finalStates).length !== 0;
    if (isFinalState) {
      prevFinalState.push(setOfState);
    }
    index++;
  });
  console.log('list state: ', listStates);

  newStartState = listStates[startState.toString()];
  newFinalState = prevFinalState.map(e => listStates[e]);

  Object.keys(transition).forEach(key => {
    let newKey = listStates[key];
    newTransition[newKey] = {};
    newStates.push(newKey);
    for (var symbol of newSymbols) {
      let newState = listStates[transition[key][symbol]];

      newTransition[newKey][symbol] = [newState];
    }
  });

  console.log('');
  // console.log("list state: ", listStates);
  // console.log('Prev state: ', $startState);
  console.log('New Start: ', newStartState);
  console.log('Prev Final: ', prevFinalState);
  console.log('New Final: ', newFinalState);
  // console.log("Prev Tran: ", $transition);
  console.log('New Tran: ', newTransition);

  return new FaModel(
    newStates,
    newSymbols,
    newStartState,
    newFinalState,
    newTransition,
  );
};

export default ConvertNFAtoDFA;
