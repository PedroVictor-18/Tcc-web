/* eslint-disable import/no-extraneous-dependencies */
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './ducks';

const store = createStore(reducers, composeWithDevTools());

export default store;
