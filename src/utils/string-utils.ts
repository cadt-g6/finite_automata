export const toStateString = (title: string, states: Array<string>): string => {
  return title + ': {' + states.join(',') + '}';
};

export const validateSortByQuery = (query: string): 'desc' | 'asc' => {
  return query === 'desc' || query === 'asc' ? query : 'desc';
};
