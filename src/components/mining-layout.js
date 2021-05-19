import React, { useState } from 'react';
import store from '../store/store';
import {useSelector} from 'react-redux';
import {Block, Blockchain, Wallet} from '@asalvatore/microchain';
import { addBlock } from '../store/actions/chain-actions';

const MiningLayout = (props) =>{

    const keys = useSelector(state => state.walletReducer);
    const chain = useSelector(state => state.chainReducer);
    const [isMining, setMining] = useState(false);
    const [nonce, setNonce] = useState(0);

    const relaunchMining = (block) => {
        const result = block.mine(10);
        setNonce(block.nonce);
        result? endMining(block) : loopMining(block);
    };

    const loopMining = (block) =>{
        setTimeout(() => relaunchMining(block), 12);
    }
   
    const endMining = (block) =>{
        setMining(false);
        store.dispatch(addBlock(block));
    }

    const mining = () =>{

        const lastBlock = Blockchain.getInstance().lastBlock
        const block = new Block({
           height: lastBlock.height + 1,
           prevHash: lastBlock.hash,
           publisher: keys.publicKey,
           transactions: JSON.stringify(chain.pendingTX),
        });
        const userWallet = new Wallet(keys.publicKey, keys.privateKey);
        block.sign(userWallet);
        setMining(true);
        setNonce(0);
        loopMining(block);
    }

    return <div>
        <h2>⚒️ Mining layout</h2>
        {!isMining && <div>
        <div>There is {chain.pendingTX.length} transaction(s) pending.</div>
        <button onClick={mining}>launch mining</button>
        </div>}

        {isMining && <div>
            ⛏️ Mining in progress... be patient it could take a while. Current nonce is {nonce}.
        </div>}

        </div>
       
}

export default MiningLayout;