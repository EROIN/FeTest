import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history';

import customMiddlewares from '../middleware';
import customReducers from '../modules';

const defaultData = {};
const middlewares = [
  thunk,
  promiseMiddleware,
  routerMiddleware(createBrowserHistory()),
  ...customMiddlewares
];

const storeExtensions = [
  applyMiddleware(...middlewares)
];

export default function (data = defaultData) {
  const finalCreateStore = compose(...storeExtensions)(createStore);

  const reducer = combineReducers({
    ...customReducers,
    routing: routerReducer
  });

  return finalCreateStore(reducer, data);
}
