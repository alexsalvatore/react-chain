import ReactDOM from 'react-dom';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './store/store';
import WalletLayout from './components/wallet-layout';

const store = createStore(reducers);

const App = () => {
 return <div>
     <Provider store={store}>
     <h1>Microchain 💴</h1>
     <WalletLayout></WalletLayout>
     </Provider>
     </div>;
 }
ReactDOM.render(<App />, document.getElementById('app'));