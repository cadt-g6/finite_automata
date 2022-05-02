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
  const { states, alphabets } = datas;
  let transitions = {};
  getArrayFromValues(states).forEach(state => {
    let alphabetTransition = {};
    getArrayFromValues(alphabets).forEach(alphabet => {
      alphabetTransition[alphabet] = datas[`${state}${alphabet}`]
        ? datas[`${state}${alphabet}`]
        : [];
    });

    transitions[state] = alphabetTransition;
  });

  return transitions;
};
