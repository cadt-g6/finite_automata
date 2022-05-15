import { OrderByFields } from 'app/services/cloud_database/BaseDatabase';
import { OrderByDirection } from 'firebase/firestore';

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

export const validateSortByQuery = (query: string | null): OrderByDirection => {
  switch (query) {
    case 'desc':
    case 'asc':
      return query;
    default:
      return 'desc';
  }
};

export const validateOrderByQuery = (query: string | null): OrderByFields => {
  switch (query) {
    case 'title':
    case 'created_at':
    case 'updated_at':
      return query;
    default:
      return 'created_at';
  }
};
