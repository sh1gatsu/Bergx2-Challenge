import { Action } from '../Types/Action';
import { Item } from '../Types/Item';

export function items(state: Item[] = [], action: Action) {
  switch (action.type) {
    case 'ITEMS_FETCH_DATA_SUCCESS':
      return action.items;

    case 'ITEMS_FETCH_DATA_LOSS':
      throw new Error('Cant load data, pls try again later :c');

    default:
      return state;
  }
}
