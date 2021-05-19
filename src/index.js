import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import store from './store/store';
import WalletLayout from './components/wallet-layout';
import ChainLayout from './components/chain-layout';
import MiningLayout from './components/mining-layout';
import MoneyLayout from './components/money-layout';
import PostingLayout from './components/posting-layout';


const App = () => {

 return <div>
     <Provider store={store}>
     <h1>Microchain 💴</h1>
     <WalletLayout></WalletLayout>
     <MoneyLayout></MoneyLayout>
     <PostingLayout></PostingLayout>
     <MiningLayout></MiningLayout>
     <ChainLayout></ChainLayout>
     </Provider>
     </div>;
 }
ReactDOM.render(<App />, document.getElementById('app'));