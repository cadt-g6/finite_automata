export const toStateString = (title: string, states: Array<string>): string => {
  if (states.length === 0) return 'No States';
  return title + ': {' + states.join(',') + '}';
};

export const toMergeString = (states: string[]): string => {
  let string = '';
  states.forEach((state, index) => {
    string += `Q${index}` + ': {' + state + '} ';
  });

  return string;
};
export const validateSortByQuery = (query: string): 'desc' | 'asc' => {
  return query === 'desc' || query === 'asc' ? query : 'desc';
};
