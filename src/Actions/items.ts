import { Item } from '../Types/Item';
import { Dispatch } from 'redux';

export function itemsFetchDataSuccess(items: Item[]) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items,
  };
}

export function itemsFetchDataLoss(error: string) {
  return {
    type: 'ITEMS_FETCH_DATA_LOSS',
    error,
  };
}

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function itemsFetchData(url: string) {
  return (dispatch: Dispatch) => {
    return wait(500)
      .then(async() => fetch(url))
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      }).catch((error) => dispatch(itemsFetchDataLoss(error)))
      .then((items) => dispatch(itemsFetchDataSuccess(items)));
  };
}
