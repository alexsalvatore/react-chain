import ReactDOM from 'react-dom';
import React from 'react';
import {WalletLayout} from './components/wallet-layout';

const App = () => {
 return <div>
     <h1>Microchain 💴 </h1>
     <WalletLayout></WalletLayout>
     </div>;
 }
ReactDOM.render(<App />, document.getElementById('app'));