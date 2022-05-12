import FaModel from 'app/models/FaModel';

export const getArrayFromValues = (value: string) => {
  if (!value) return [];
  const regExp =
    /^(((([a-z]|[A-Z]|[0-9])+\d*)(?!.*,\3\b)),)*([a-z]|[A-Z]|[0-9])+\d*$/;

  const result = regExp.exec(value);
  if (result) {
    return result[0].split(',').map(value => value);
  } else {
    return [];
  }
};

export const getTransitionObjectFromForm = datas => {
  if (!datas) return {};
  const { states, symbols } = datas;
  let transitions = {};
  getArrayFromValues(states).forEach(state => {
    let alphabetTransition = {};
    getArrayFromValues(symbols).forEach(alphabet => {
      alphabetTransition[alphabet] = datas[`${state}${alphabet}`]
        ? datas[`${state}${alphabet}`]
        : [];
    });

    transitions[state] = alphabetTransition;
  });

  return transitions;
};

export const getTransitionDefaultValues = (states, symbols, transitions) => {
  let data = {};
  getArrayFromValues(states).forEach(state => {
    getArrayFromValues(symbols).forEach(symbol => {
      data[`${state}${symbol}`] = transitions[state][symbol];
    });
  });
  return data;
};

export const getDefaultValuesFromFaData = (datas?: FaModel) => {
  if (!datas)
    return {
      states: '',
      symbols: '',
      startState: '',
      endStates: [],
      title: '',
    };

  return {
    states: datas.states.join(','),
    symbols: datas.symbols.join(','),
    startState: datas.startState,
    endStates: datas.endStates,
    title: datas.title,
    ...getTransitionDefaultValues(
      datas.states,
      datas.symbols,
      datas.transitions,
    ),
  };
};
