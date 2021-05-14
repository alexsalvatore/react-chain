import React, { useState } from 'react';
import {connect} from 'react-redux';
import {WALLET_EDIT, WALLET_CREATE, WALLET_CLEAR} from '../store/actions/wallet-actions';

const WalletLayout = (props) =>{
/*
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
    }*/

    const createWallet = () =>{
        props.walletGenerate();
    }

    const onChange = (e) =>{
        console.log(props.keys);
        const newKeys = {... props.keys, [e.target.id]:e.target.value};
        console.log(newKeys.publicKey, newKeys.privateKey);
        props.walletEdit(newKeys.publicKey, newKeys.privateKey);
    }

    return <div>
        👀 Public Key: <input id ="publicKey" type="text" value={props.keys.publicKey} onChange={onChange}></input> <br/>
        🔒 Private Key: <input id ="privateKey" type="text" value={props.keys.privateKey} onChange={onChange}></input> <br/>
        {props.keys.isOk ? <span>Keys pair valid ✔️</span> : <span>Keys pair unvalid 👎</span>}<br/>
        <button onClick={createWallet}>Create wallet</button>
    </div>
}

const mapStateToProps = (state) =>({
    keys: state.walletReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
      // dispatching plain actions
      walletEdit: (publicKey, privateKey) => dispatch({ type: WALLET_EDIT, payload:{publicKey, privateKey} }),
      walletGenerate: () => dispatch({ type: WALLET_CREATE }),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps )(WalletLayout);
