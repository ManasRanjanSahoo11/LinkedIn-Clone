import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from '../reducers';

// Create store and apply thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
