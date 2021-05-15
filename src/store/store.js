import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { walletReducer } from './reducers/wallet-reducer';
import { chainReducer } from './reducers/chain-reducer';

export default createStore(combineReducers({walletReducer,chainReducer}),applyMiddleware(thunk));