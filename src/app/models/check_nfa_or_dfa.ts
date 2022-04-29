import FaModel from "app/models/FaModel";
import Translation from "app/models/FaModel";

const states = ['q1', 'q2'];
const symbols = ['a', 'b'];
const startState = 'q0';
const endStates = ['q2']
const transitions1 = {
  'q0': {
    'a': ['q1'],
    'b': ['q0'],
  },
  'q1': {
    'a': ['q1'],
    'b': ['q0'],
  },
};

const transitions2 = {
  'q0': {
    'a': ['q1', 'q0'],
    'b': ['q0'],
  },
  'q1': {
    'a': ['q1'],
    'b': ['q0'],
  },
};

const fa1 = new FaModel(
  states,
  symbols,
  startState,
  endStates,
  transitions1,
)

const fa2 = new FaModel(
  states,
  symbols,
  startState,
  endStates,
  transitions2,
)

function checkIfDfaOrNfa(fa: FaModel) {
  const transitions = fa.transitions;
  let isNfa = false;
  for (let transition in transitions) {
    for (let symbol in transitions[transition]) {
      let symbolTransition = transitions[transition][symbol]
      if (symbolTransition.length > 1) {
        isNfa = true;
      }
    }
  }
  if (isNfa)
    console.log("It's is a non-deterministic finite automata");
  else
    console.log("It's is a determinstic finite automata");
}

export default checkIfDfaOrNfa;