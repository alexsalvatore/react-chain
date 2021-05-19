import {Blockchain} from '@asalvatore/microchain';
import localforage from 'localforage';

export const CHAIN_ADD_BLOCK = "CHAIN_ADD_BLOCK";
export const CHAIN_ADD_CHAIN = "CHAIN_ADD_CHAIN";
export const CHAIN_IS_MINING = "CHAIN_IS_MINING";
export const CHAIN_ADD_PENDING_TX = "CHAIN_ADD_PENDING_TX";

const saveChain = () => {
    const blocks = Blockchain.getInstance().chain;
    localforage.setItem("chain",JSON.stringify(blocks));
}

export const initChain = () => {

    // Try to fetch the chain
    return  (dispatch) =>{
        localforage.getItem("chain", (err, value) => {
        const blocksMem = (!err && value)? JSON.parse(value): null;

        Blockchain.init( {
            BLOCK_HASH_METHOD: "MD5",
            BLOCK_MIN_DIFFICULTY: 3,
            BLOCK_MAX_DIFFICULTY: 5,
            TX_CONTENT_EXPIRATION_HOURS: 12,
            MONEY_BY_BLOCK: 15,
            MONEY_BY_KO: 1.2,
            TX_CONTENT_MAX_SIZE_KO: 200,
            GENESIS_BLOCK: {
              publisher: "04820be6a65e928d52e92b8bfe7827de7a09d3afa1356ef81f6f8528b44ba84393d32b44e4590fa9ca6b9576a6d7f2f0467af33d8f68f83e1359a8e4981f4ed5f6",
            },
            FOUNDERS: "04820be6a65e928d52e92b8bfe7827de7a09d3afa1356ef81f6f8528b44ba84393d32b44e4590fa9ca6b9576a6d7f2f0467af33d8f68f83e1359a8e4981f4ed5f6",
          }, blocksMem);
    
          const blocks = Blockchain.getInstance().chain;
          // If blockmem == NULL we generated the genensis block
          if(!blocksMem) saveChain();
        
         dispatch({type: CHAIN_ADD_CHAIN ,payload: {blocks}});
    });
    }
}

export const addBlock = (block) =>{
    return  (dispatch) =>{
        const result = Blockchain.getInstance().addBlock(block);
        if(!result) return;
        saveChain();
        dispatch({type: CHAIN_ADD_BLOCK ,payload: {block}});
    }
}

export const addPendingTX = (tx) =>{
    return  (dispatch) =>{
        dispatch({type: CHAIN_ADD_PENDING_TX ,payload: {tx}});
    }
}

export const addChain = (blocks) =>{
    return  (dispatch) =>dispatch({type: CHAIN_ADD_CHAIN ,payload: {blocks}});
}