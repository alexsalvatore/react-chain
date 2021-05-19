import {CHAIN_ADD_BLOCK, CHAIN_ADD_CHAIN, CHAIN_IS_MINING, CHAIN_ADD_PENDING_TX} from '../actions/chain-actions';

const initialState = {
    blocks: [],
    pendingTX: [],
    isMining: false,
};

export const chainReducer = (state = initialState, action) =>{
    switch(action.type){
        case CHAIN_ADD_BLOCK:
            return {...state, blocks: [...state.blocks, action.payload.block], isMining: false };
        
        case CHAIN_ADD_CHAIN:
            return {...state, blocks:  [...state.blocks, ...action.payload.blocks]};
        
        case CHAIN_ADD_PENDING_TX:
            return {...state, pendingTX:  [...state.pendingTX, action.payload.tx]};

        case CHAIN_IS_MINING:
            return {...state, isMining: true };
        
        
        default:
            return state;
    }
}