import React from 'react';
import store from '../store/store';
import {useSelector} from 'react-redux';
import {Block, Blockchain, Wallet} from '@asalvatore/microchain';
import { addBlock } from '../store/actions/chain-actions';

const MiningLayout = (props) =>{

    const keys = useSelector(state => state.walletReducer);

    const mining = () =>{
        const lastBlock = Blockchain.getInstance().lastBlock
        const block = new Block({
           height: lastBlock.height + 1,
           prevHash: lastBlock.hash,
           publisher: keys.publicKey,
        });
        const userWallet = new Wallet(keys.publicKey, keys.privateKey);
        block.sign(userWallet);
        block.mine();
        store.dispatch(addBlock(block));
    }

    return <div><h2>⚒️ Mining layout</h2> <button onClick={mining}>launch mining</button></div>
}

export default MiningLayout;