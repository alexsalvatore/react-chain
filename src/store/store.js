import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { walletReducer } from './reducers/wallet-reducer';

export default createStore(combineReducers({walletReducer}),applyMiddleware(thunk));