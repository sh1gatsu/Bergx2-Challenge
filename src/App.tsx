import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import ListContainer from './Components/ListContainer/ListContainer';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className='app__header'>
        <h1 className='app__title'>The challenge</h1>
      </div>
      <ListContainer />
    </Provider>
  );
}

export default App;
