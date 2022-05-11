export const toStateString = (title: string, states: Array<string>): string => {
  return title + ': {' + states.join(',') + '}';
};
