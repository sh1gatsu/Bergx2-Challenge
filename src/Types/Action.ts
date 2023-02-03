import { Item } from './Item';

export interface Action {
  type: string,
  items: Item[],
}
