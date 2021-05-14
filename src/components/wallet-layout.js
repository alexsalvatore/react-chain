import React, { useState } from 'react';
import {Wallet} from '@asalvatore/microchain';

export const WalletLayout = (props) =>{

    const [ keys, setKeys ] = useState({
        publicKey: '',
        privateKey: '',
        isOk: false,
    });

    const createWallet = () =>{
        const wallet = new Wallet();
        const newKeys = {... keys, publicKey:wallet.publicKey, privateKey: wallet.privateKey};
        setKeys(newKeys);
        testKeys(newKeys);
    }

    const onChange = (e) =>{
        const newKeys = {... keys, [e.target.id]:e.target.value};
        setKeys(newKeys);
        testKeys(newKeys);
    }

    const testKeys = ( newKeys ) =>{
        // Test keys
        const wallet = new Wallet(newKeys.publicKey,newKeys.privateKey);
        const testMessage = 'test';
        const signature = wallet.sign(testMessage);
        const isOk = Wallet.verifySignature(testMessage, signature,newKeys.publicKey);
        setKeys({...newKeys, isOk});
    }

    return <div>
        👀 Public Key: <input id ="publicKey" type="text" value={keys.publicKey} onChange={onChange}></input> <br/>
        🔒 Private Key: <input id ="privateKey" type="text" value={keys.privateKey} onChange={onChange}></input> <br/>
        {keys.isOk ? <span>Keys pair valid ✔️</span> : <span>Keys pair unvalid 👎</span>}<br/>
        <button onClick={createWallet}>Create wallet</button>
    </div>
}
