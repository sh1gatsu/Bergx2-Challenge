/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */
import React from 'react';
import { render } from '@testing-library/react';
import { ItemsList } from './ItemsList';
import { Item } from '../../Types/Item';

interface KeyedItem {
  [key: number]: Item;
}

const buildTree = (list: Item[]) => {
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
};

describe('Items List', () => {
  test('Items are sorted by default if no SortType is provided', () => {
    const items = [
      { id: 1, label: 'item 1', parent_id: 0 },
      { id: 2, label: 'item 2', parent_id: 1 },
      { id: 3, label: 'item 3', parent_id: 2 },
    ];

    const { getByText } = render(
      <ItemsList items={items} />,
    );

    expect(getByText('item 1').textContent).toBe('item 1');
    expect(getByText('item 2').textContent).toBe('item 2');
    expect(getByText('item 3').textContent).toBe('item 3');
  });

  test('Items are sorted correct if provided SortType.Tree', () => {
    const list: Item[] = [
      { id: 1, parent_id: 0, label: 'Item 1' },
      { id: 2, parent_id: 1, label: 'Item 2' },
      { id: 3, parent_id: 2, label: 'Item 3' },
      { id: 4, parent_id: 0, label: 'Item 4' },
      { id: 5, parent_id: 4, label: 'Item 5' },
    ];

    const expectedResult: Item[] = [
      { id: 1, parent_id: 0, label: 'Item 1', children: [
        { id: 2, parent_id: 1, label: 'Item 2', children: [
          { id: 3, parent_id: 2, label: 'Item 3', children: [] }
        ] }
      ] },
      { id: 4, parent_id: 0, label: 'Item 4', children: [
        { id: 5, parent_id: 4, label: 'Item 5', children: [] }
      ] }
    ];

    const result = buildTree(list);

    expect(result).toEqual(expectedResult);
  });
});
