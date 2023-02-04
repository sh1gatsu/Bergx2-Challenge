import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import ListContainer from './ListContainer';
import { createStore } from 'redux';

const initialState = {
  items: [],
};

const mockStore = createStore(() => initialState);

describe('ListContainer', () => {
  test('renders list wrapper', () => {
    render(
      <Provider store={mockStore}>
        <ListContainer />
      </Provider>,
    );

    const listWrapper = screen.getByTestId('wrapper');

    expect(listWrapper).toBeInTheDocument();
  });
});
