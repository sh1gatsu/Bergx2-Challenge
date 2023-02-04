import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { itemsFetchData } from '../../Actions/items';
import { ErrorValues } from '../../Types/EnumErrorsTypes';
import { SortType } from '../../Types/EnumSortTypes';
import { Item } from '../../Types/Item';
import { ItemsList } from '../ItemsList';
import { Loader } from '../Loader';

import './ListContainer.scss';

interface RootState {
  items: Item[];
}

const mapStateToProps = (state: RootState) => ({
  items: state.items,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchData: (url: string) => dispatch(itemsFetchData(url)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ListContainer: React.FC<PropsFromRedux> = React.memo(
  ({ fetchData, items }) => {
    const [sortedItems, setSortedItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isErrorHappend, setErrorIsHappend] = useState(false);
    const [errorMessage, setErrorMessage] = useState(ErrorValues.DEFAULT);

    useEffect(() => {
      const loadingData = async() => {
        try {
          setIsLoading(true);

          const data = await fetchData(
            'http://5af1eee530f9490014ead8c4.mockapi.io/items',
          );

          setErrorIsHappend(false);

          setIsLoading(false);

          return data;
        } catch (error) {
          errorHandler(ErrorValues.SERVER);
          setIsLoading(false);
        }
      };

      loadingData();
    }, [fetchData]);

    useEffect(() => {
      setSortedItems([...items].sort((a, b) => a.id - b.id));
    }, [items]);

    const errorHandler = (currentError: ErrorValues) => {
      setSortedItems([]);
      setErrorMessage(currentError);
      setErrorIsHappend(true);
    };

    return (
      <div className='list-container'>
        {isLoading
          ? (
            <Loader />
          )
          : (
            <div className='list-container__wrapper' data-testid='wrapper'>
              <ItemsList items={sortedItems}/>
              <ItemsList items={sortedItems} sortType={SortType.TREE} />
            </div>
          )}
        {isErrorHappend && (<p>{errorMessage}</p>)}
      </div>
    );
  },
);

export default connector(ListContainer);
