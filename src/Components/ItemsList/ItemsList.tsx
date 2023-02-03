import React, { useCallback, useEffect, useState } from 'react';
import { SortType } from '../../Types/EnumSortTypes';
import { Item } from '../../Types/Item';

interface ListItemsProps {
  items: Item[]
  sortType?: SortType
}

interface KeyedItem {
  [key: number]: Item;
}

export const ItemsList: React.FC<ListItemsProps> = React.memo(
  ({ items, sortType }) => {
    const [listItems, setListItems] = useState<Item[]>([]);

    useEffect(() => {
      setListItems(items);
    }, [items]);

    const buildTree = useCallback((list: Item[]) => {
      const map: KeyedItem = {};

      for (const item of list) {
        map[item.id] = item;
        item.children = [];
      }

      const tree: Item[] = [];

      for (const item of list) {
        if (item.parent_id !== 0) {
          map[item.parent_id].children?.push(item);
        } else {
          tree.push(item);
        }
      }

      return tree;
    }, []);

    let visibleItems = listItems;

    if (sortType && sortType === SortType.TREE) {
      visibleItems = buildTree(listItems);
    }

    return (
      <div>
        <ul>
          {visibleItems.map((item: Item) => (
            <li key={item.id}>
              {item.label}
              {item.children && item.children?.length > 0 && (
                <ItemsList items={item.children} />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
